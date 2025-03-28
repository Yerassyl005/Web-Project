export interface Book {
  id: number;
  title: string;
  shortDescription: string;
  addTime: string;
  thumbnailUrl: string;
  language?: string;
  year?: string;
  hasAudio: boolean;
  hasFile: boolean;
  filePath?: string;
  oldFileUrl?: string;
  oldLatynUrl?: string;
  speakerId?: number;
  html?: string;
  qStatus?: number;
  updateTime?: string;
}

export interface BookResponse {
  count: number;
  results: Book[];
} 