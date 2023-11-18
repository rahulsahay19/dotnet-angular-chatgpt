import { Component } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(public basketService: BasketService) {}
  
}
