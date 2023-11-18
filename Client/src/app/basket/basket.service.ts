import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Basket, BasketItem } from '../shared/models/basket';
import { Product } from '../shared/models/Product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basketSubject: BehaviorSubject<Basket | null> = new BehaviorSubject<Basket | null>(null);
  basketSubject$ = this.basketSubject.asObservable();
  private readonly basketUrl = 'http://localhost:5103/api/Basket/'; 

  constructor(private http: HttpClient) {}

  getBasket(basketId: string) {
    return this.http.get<Basket>(this.basketUrl + basketId).subscribe({
      next: basket=> this.basketSubject.next(basket)
    })
  }

  setBasket(basket:Basket) {
    return this.http.post<Basket>(this.basketUrl, basket).subscribe({
      next: basket => this.basketSubject.next(basket)
    })
  }

  getBasketSubjectCurrentValue(){
    return this.basketSubject.value;
  }

  addItemToBasket(item: Product, quantity = 1){
    const cartItem = this.mapProductToBasket(item);
    const basket = this.getBasketSubjectCurrentValue() ?? this.createBasket();
    basket.items = this.upsertItem(basket.items, cartItem, quantity);
    this.setBasket(basket);
  }

  private upsertItem(items: BasketItem[], basketItem: BasketItem, quantity: number): BasketItem[] {
    const item = items.find(p=>p.id === basketItem.id);
    if(item){
      item.quantity+= quantity;    
    }else{
      basketItem.quantity = quantity;
      items.push(basketItem);
    }
    return items;
  }
  
  private mapProductToBasket(item: Product): BasketItem {
    const basketItem: BasketItem = {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      productBrand: item.productBrand,
      productType: item.productType
    };
  
    return basketItem;
  }

  private createBasket(): Basket{
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
  
}


