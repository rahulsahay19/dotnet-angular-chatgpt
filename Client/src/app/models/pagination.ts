import { Product } from "./Product";

export interface Pagination {
    pageIndex: number;
    pageSize: number;
    totalItems: number;
    data: Product[];
  }