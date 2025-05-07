export interface Quote {
  id: string | number;
  content: string;
  author: string;
  tags?: string[];
  pinned?: boolean;
}
