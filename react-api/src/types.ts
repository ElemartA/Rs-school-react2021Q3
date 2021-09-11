export interface Article {
  author: string;
  title: string;
  description: string;
  urlToImage: string;
  content: string;
  publishedAt: string;
  sourse: { id: string; name: string };
}

export enum SortType {
  relevancy = 'relevancy',
  popularity = 'popularity',
  publishedAt = 'publishedAt',
}
