export interface PaginatedItems<T> {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: T;
  }
  