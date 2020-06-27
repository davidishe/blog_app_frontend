import { IComment } from './comment';

export interface IArticle {
  id?: number;
  name: string;
  description: string;
  text: string;
  authorDisplayName: string;
  authorEmail: string;
  authorPhoto: string;
  authorDescription: string;
  comments?: IComment[];
  guId: number;
  enrolledDate: Date;
}



