import type { ParsedDocInfo } from "./types";
import { parsePlaseholders } from "../../features/docx-processing/parsePlaseholders";
import PizZip from "pizzip";

class DocumentServiceClass {
  async parse(file: File): Promise<ParsedDocInfo> {
    const name = file.name.toLowerCase();

    const arrayBuffer = await file.arrayBuffer();

    // только .docx поддерживает
    if (!name.endsWith(".docx")) {

      return { placeholders: [], pageCount: undefined };
    }

    
    try {
      const zip = new PizZip(arrayBuffer);

      // освновое тело доки
      const xml = zip.file("word/document.xml")?.asText() ?? "";

      // ищет в документе плейсхолдеры в футере и хедере
      const headerFiles = Object.keys(zip.files).filter((p) => /word\/(header|footer).*\.xml$/.test(p));
      let combined = xml + headerFiles.map((p) => zip.file(p)!.asText()).join(" ");

      
      // использует резервное сканирование, если ничего не найдено
      if (!combined) {
        combined = new TextDecoder().decode(arrayBuffer);
      }

      const placeholders = parsePlaseholders(new TextEncoder().encode(combined).buffer);

      
      const pageBreakMatches = combined.match(/<w:br[^>]*w:type="page"[^>]*>/g) || [];
      const sectPrMatches = combined.match(/<w:sectPr[^>]*>/g) || [];
      
      // минимум 1 страницы
      const pageCount = Math.max(1, pageBreakMatches.length + sectPrMatches.length + 0);

      return { placeholders, pageCount };
    } catch {

      //резервный вариант, поиск по буферу
      const placeholders = parsePlaseholders(arrayBuffer);
      return { placeholders, pageCount: undefined };
    }
  }
}

export const DocumentService = new DocumentServiceClass();
