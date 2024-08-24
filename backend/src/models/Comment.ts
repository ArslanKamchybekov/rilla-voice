// backend/models/Comment.ts
export interface Comment {
    id: string;
    transcriptId: string;
    commentText: string;
    start: number;
    end: number;
    fileUrls: string[];
    createdAt: string;
  }
  