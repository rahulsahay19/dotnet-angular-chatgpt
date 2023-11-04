export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productType: {
    id: number;
    name: string;
  };
  productBrand: {
    id: number;
    name: string;
  };
}
