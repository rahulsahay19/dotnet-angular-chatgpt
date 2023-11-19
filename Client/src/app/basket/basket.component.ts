import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { BasketItem } from '../shared/models/basket';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  constructor(public basketService: BasketService) {}

// Method to extract image name from pictureUrl
  extractImageName(item: BasketItem): string | null {
    if (item && item.pictureUrl) {
      const parts = item.pictureUrl.split('/');
      if (parts.length > 0) {
        return parts[parts.length - 1]; // Get the last part after the last /
      }
    }
    return null; // Return null if pictureUrl is not valid
  }
}
