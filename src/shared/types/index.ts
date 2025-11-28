export interface UploadResult {
  fileName: string;
  size: number;
  uploadedAt: Date;
}

export interface PlaceholderData {
  [key: string]: string;
}