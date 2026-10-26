export type SourceType = 'md' | 'pdf' | 'docx' | 'txt' | 'table' | 'json';

export type CourseCategory = 
  | 'Английский язык'
  | 'Немецкий язык'
  | 'Русский язык'
  | 'Тарифы и оплата'
  | 'Методология и правила'
  | 'О центре и локации';

export interface SourceChunk {
  id: string;
  title: string;
  text: string;
  pageOrSection?: string;
}

export interface SourceDocument {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: CourseCategory;
  tags: string[];
  type: SourceType;
  date: string;
  file: string;
  featured?: boolean;
  content: string;
  chunks: SourceChunk[];
  metadata?: {
    author?: string;
    level?: string;
    duration?: string;
    language?: string;
    isDemo?: boolean;
    tuition?: string;
  };
}

export interface SearchResult {
  source: SourceDocument;
  score: number;
  matchedChunks: {
    chunk: SourceChunk;
    snippet: string;
    highlightedSnippet: string;
    relevance: number;
  }[];
  matchedFields: ('title' | 'description' | 'content' | 'tags' | 'category')[];
}

export interface SmartAnswer {
  summary: string;
  directQuote: string;
  citedSources: {
    sourceId: string;
    sourceSlug: string;
    title: string;
    category: string;
    section?: string;
  }[];
  confidence: 'high' | 'medium' | 'low';
}

export interface DialogItem {
  id: string;
  timestamp: string;
  query: string;
  answerSummary: string;
  topSourceTitle: string;
  topSourceSlug: string;
  resultsCount: number;
}

export interface LeadSubmission {
  id: string;
  fullName: string;
  phone: string;
  course: string;
  format: 'offline' | 'online';
  preferredTime: 'morning' | 'afternoon' | 'evening';
  comment?: string;
  createdAt: string;
}
