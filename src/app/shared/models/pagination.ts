import { IProduct } from './products/product';
import { IArticle } from './articles/article';

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IArticle[];
}

export class PaginatedResult<T> {
  result: T;
  pagination: IPagination;
}

export class Pagination implements IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IArticle[];
}



