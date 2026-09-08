import Foundation
import Vision
import AppKit

// usage: ocrdir <inputDir> <outputTxt>
let args = CommandLine.arguments
guard args.count >= 3 else { print("usage: ocrdir <inputDir> <out>"); exit(1) }
let dir = args[1]
let out = args[2]
let fm = FileManager.default
let files = (try! fm.contentsOfDirectory(atPath: dir))
    .filter { $0.hasSuffix(".png") }
    .sorted()
var textOut = ""
textOut += "# PAGES=\(files.count)\n"

for f in files {
    let path = (dir as NSString).appendingPathComponent(f)
    let page = Int(f.dropFirst(1).prefix(3)) ?? 0
    textOut += "\n===== PDF_PAGE_\(String(format: "%03d", page)) =====\n"
    guard let img = NSImage(contentsOfFile: path),
          let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
        textOut += "(load fail)\n"; continue
    }
    let req = VNRecognizeTextRequest { request, _ in
        guard let obs = request.results as? [VNRecognizedTextObservation] else { return }
        let sorted = obs.sorted { a, b in
            if abs(a.boundingBox.midY - b.boundingBox.midY) > 0.02 { return a.boundingBox.midY > b.boundingBox.midY }
            return a.boundingBox.minX < b.boundingBox.minX
        }
        for o in sorted {
            if let t = o.topCandidates(1).first { textOut += t.string + "\n" }
        }
    }
    req.recognitionLevel = .accurate
    req.recognitionLanguages = ["zh-Hans", "en-US"]
    req.usesLanguageCorrection = true
    let handler = VNImageRequestHandler(cgImage: cg, options: [:])
    do { try handler.perform([req]) } catch { textOut += "(ocr error)\n" }
}
try textOut.write(toFile: out, atomically: true, encoding: .utf8)
print("done", textOut.count)