import { IProduct } from './products/product';

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IProduct[];
}

export class PaginatedResult<T> {
  result: T;
  pagination: IPagination;
}
