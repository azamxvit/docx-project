import type { ParsedDocInfo } from "./types";
import { parsePlaseholders } from "../../features/docx-processing/parsePlaseholders";

class DocumentServiceClass {
  async parse(file: File): Promise<ParsedDocInfo> {
    if (!file.name.endsWith(".docx")) {
      throw new Error("Поддерживаются только .docx файлы");
    }

    const arrayBuffer = await file.arrayBuffer();
    const placeholders = parsePlaseholders(arrayBuffer);

    return {
      placeholders,
      pageCount: undefined, // позже добавишь то что нужно (напоминалка)
    };
  }
}

export const DocumentService = new DocumentServiceClass();
