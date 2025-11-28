export interface UploadedDoc {
    name: string;
    size: number;
    type: string;
    lastModified: number;
}



export interface ParsedDocInfo {
    placeholders: string[];
    pageCount?: number;
}