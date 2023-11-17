import { uuid } from "uuidv4"

export interface Basket {
    id: string
    items: BasketItem[]
  }
  
  export interface BasketItem {
    id: number
    productName: string
    price: number
    quantity: number
    pictureUrl: string
    productBrand: string
    productType: string
  }
  
  export class Basket implements Basket{
    id = uuid();
    items: BasketItem[] = [];
  }