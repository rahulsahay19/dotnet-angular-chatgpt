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
  brands: string[] = ['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4', 'Brand 5']; // Dummy brands
  types: string[] = ['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5']; // Dummy types
  selectedBrandIndex: number | null = null; // Index of selected brand
  selectedTypeIndex: number | null = null; // Index of selected product type

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    // Fetch products using the service and assign the observable to pagination$
    this.storeService.getProducts('NameAsc', 0, 10).subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (error) => console.error(error),
    });
  }

  // Filter products based on the selected brand
  selectBrand(index: number) {
    this.selectedBrandIndex = index;
    this.filterProducts();
  }

  // Filter products based on the selected product type
  selectType(index: number) {
    this.selectedTypeIndex = index;
    this.filterProducts();
  }

  // Helper method to filter products based on selected brand and type
  filterProducts() {
    this.products = this.storeService.filterProducts(
      this.selectedBrandIndex !== null ? this.brands[this.selectedBrandIndex] : null,
      this.selectedTypeIndex !== null ? this.types[this.selectedTypeIndex] : null
    );
  }
}
