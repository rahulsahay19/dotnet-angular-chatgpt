import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from './store.service';
import { Product } from '../shared/models/Product';
import { Observable } from 'rxjs';
import { Pagination } from '../shared/models/Pagination';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  @Input() title: string = '';
  products: Product[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    // Fetch products using the service and assign the observable to pagination$
    this.storeService.getProducts('NameAsc', 0, 10).subscribe({
      next: response => this.products = response.data,
      error: error=> console.error(error)
    })
  }
}
