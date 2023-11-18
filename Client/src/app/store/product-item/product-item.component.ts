import { Component, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/models/Product';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product: Product | null = null;

  constructor(private baseketService: BasketService){}

  // Method to extract image name from pictureUrl
  extractImageName(): string | null {
    if (this.product && this.product.pictureUrl) {
      const parts = this.product.pictureUrl.split('/');
      if (parts.length > 0) {
        return parts[parts.length - 1]; // Get the last part after the last /
      }
    }
    return null; // Return null if pictureUrl is not valid
  }

  addItemToBasket(){
    this.product && this.baseketService.addItemToBasket(this.product);
  }
}
