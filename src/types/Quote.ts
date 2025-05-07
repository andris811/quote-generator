export interface Quote {
  id: string | number; // Unique and stable
  content: string;
  author: string;
  tags?: string[];
  pinned?: boolean;
}
