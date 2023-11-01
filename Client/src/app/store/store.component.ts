import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from './store.service';
import { Product } from '../shared/models/Product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  @Input() title: string = '';
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  brandIdSelected = 0;
  typeIdSelected = 0;
  selectedSort = 'NameAsc'; // Default sorting

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.getBrands();
    this.getTypes();
    this.fetchProducts();
  }

  selectBrand(brandId: number) {
    this.brandIdSelected = brandId;
    this.filterProducts();
  }

  selectType(typeId: number) {
    this.typeIdSelected = typeId;
    this.filterProducts();
  }

  onSortChange() {
    this.filterProducts();
  }

  getBrands() {
    this.storeService.getBrands().subscribe({
      next: (response) => (this.brands = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  getTypes() {
    this.storeService.getTypes().subscribe({
      next: (response) => (this.types = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  fetchProducts() {
    this.storeService
      .getProducts(this.selectedSort, 0, 10, this.brandIdSelected, this.typeIdSelected)
      .subscribe((products) => {
        this.products = products.data;
      });
  }

  filterProducts() {
    this.fetchProducts();
  }
}
