declare module "mammoth" {
  export type MammothMessage = {
    type: "warning" | "error";
    message: string;
  };

  export type MammothResult = {
    value: string;
    messages: MammothMessage[];
  };

  export function convertToHtml(
    input: { arrayBuffer: ArrayBuffer },
    options?: {
      styleMap?: string[];
      includeDefaultStyleMap?: boolean;
      ignoreEmptyParagraphs?: boolean;
    },
  ): Promise<MammothResult>;
}
