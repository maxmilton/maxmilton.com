export interface MetaData {
  date: string;
  description?: string;
  draft?: boolean;
  pubdate: string;
  tags?: string[];
  title?: string;
}

export interface PostItem {
  html: string;
  metadata: MetaData;
  slug: string;
}
