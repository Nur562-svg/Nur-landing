import Foundation
import Vision
import AppKit

// usage: ocr <imagePath>
guard CommandLine.arguments.count >= 2, let p = CommandLine.arguments.last else {
    print("usage: ocr <imagePath>"); exit(1)
}
let url = URL(fileURLWithPath: p)
guard let img = NSImage(contentsOf: url),
      let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("cannot load image"); exit(2)
}
let req = VNRecognizeTextRequest { request, error in
    guard let obs = request.results as? [VNRecognizedTextObservation] else { return }
    // sort top-to-bottom, left-to-right
    let sorted = obs.sorted { a, b in
        if abs(a.boundingBox.midY - b.boundingBox.midY) > 0.02 { return a.boundingBox.midY > b.boundingBox.midY }
        return a.boundingBox.minX < b.boundingBox.minX
    }
    for o in sorted {
        if let t = o.topCandidates(1).first {
            let line = t.string
            let y = o.boundingBox.midY
            print(String(format: "Y%.3f\t%@", y, line))
        }
    }
}
req.recognitionLevel = .accurate
req.recognitionLanguages = ["zh-Hans", "en-US"]
req.usesLanguageCorrection = true
let handler = VNImageRequestHandler(cgImage: cg, options: [:])
try handler.perform([req])