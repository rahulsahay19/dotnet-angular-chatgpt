import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/Product';
import { Pagination } from './shared/models/Pagination';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Sports Center';
 
  constructor(private basketService: BasketService) {}

  ngOnInit() {
   const basketId  = localStorage.getItem('basket_id');
   if(basketId){
     this.basketService.getBasket(basketId);
  }
  }
}
