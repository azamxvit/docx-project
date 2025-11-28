import { ParsedDocInfo } from "./types";
import { parsePLaceholders } from "@/features/doc-processing/parsePlaceholders";


class DocumentServiceClass {
    async parce(file: File): Promise<ParsedDocInfo> {

        if (!file.name.endsWith(".docx")) {
            throw new Error("Поддерживаются только .docx файлы");
}



const arrayBuffer = await file.arrayBuffer();
const placeholders = parsePLaceholders(arrayBuffer);

        return {
            placeholders,
            pageCount: undefined, // позже добавишь то что нужно (напоминалка)
        };
    }
}

export const DocumentService = new DocumentServiceClass();
