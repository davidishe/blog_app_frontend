export interface IComment {
  id?: number;
  articleId?: number;
  parentId?: number;
  commentText: string;
  enrolledDate?: Date;
  subComments?: IComment[];
  commentAuthorName?: string;
  commentAuthorId?: string;
  isCommented?: boolean;
}