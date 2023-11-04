import { Product } from "./Product";

export class StoreParams {
    skip: number = 0;
    take: number = 10;
    productBrandId: number = 0;
    productTypeId: number = 0;
    search: string = '';
    selectedSort: string = 'NameAsc';
    originalProducts: Product[] = [];
    brandIdSelected: number = 0;
    typeIdSelected: number = 0;
    pageSize: number = 10;
    pageNumber: number = 1;    
  }
  