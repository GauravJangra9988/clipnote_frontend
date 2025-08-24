// Standardized content types
export type ContentType = 'url' | 'code' | 'text' | 'ai';

// --------------------
// Frontend Model (used inside React)
// --------------------
export interface ClipboardItem {
  id: string;
  content: string;
  type: ContentType;
  timestamp: Date;
  source?: string;
  title?: string;
  isFavorite?: boolean;
  tags?: string[];
  preview?: string;
  metadata?: {
    language?: string;
    domain?: string;
    wordCount?: number;
    size?: number;
  };
}

// --------------------
// API Model (exact shape returned by backend)
// --------------------
export interface ApiClipboardItem {
  id: number;
  title: string;
  text: string;
  tag: string;          // e.g. "URL", "TEXT"
  added_at: string;     // ISO date string
}

// --------------------
// Filter & Sorting
// --------------------
export interface ClipboardFilter {
  type?: ContentType;
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  favorites?: boolean;
}

export type SortOption = 'date' | 'type' | 'size' | 'title';
export type SortDirection = 'asc' | 'desc';

// --------------------
// Mapper: API → Frontend
// --------------------
export const mapApiToClipboardItem = (apiItem: ApiClipboardItem): ClipboardItem => ({
  id: String(apiItem.id),
  content: apiItem.text,
  type: apiItem.tag.toLowerCase() as ContentType,
  timestamp: new Date(apiItem.added_at),
  title: apiItem.title,
  source: "Server",
  isFavorite: false,
  tags: [apiItem.tag.toLowerCase()],
});
