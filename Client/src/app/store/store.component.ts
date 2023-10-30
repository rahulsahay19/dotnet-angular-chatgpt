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
  

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    // Fetch brands using the service and assign the observable to brands
    this.getBrands();

    // Fetch types using the service and assign the observable to types
    this.getTypes();

    // Fetch products using the service and assign the observable to products
    this.fetchProducts();
  }

  // Filter products based on the selected brand
  selectBrand(brandId: number) {
    this.brandIdSelected = brandId;
    this.filterProducts();
  }

  // Filter products based on the selected product type
  selectType(typeId: number) {
    this.typeIdSelected = typeId;
    this.filterProducts();
  }

  getBrands(){
    // Fetch brands using the service and assign the observable to brands
    this.storeService.getBrands().subscribe({
      next: response => this.brands = [{id:0, name:'All'}, ...response],
      error: error => console.log(error)
    });
  }
  getTypes(){
    this.storeService.getTypes().subscribe({
      next: response => this.types = [{id:0, name:'All'}, ...response],
      error: error => console.log(error)
    });
  }
  // Helper method to fetch products based on selected brand and type
  fetchProducts() {
    // Pass the brandIdSelected and typeIdSelected to the getProducts method
    this.storeService
      .getProducts('NameAsc', 0, 10, this.brandIdSelected, this.typeIdSelected)
      .subscribe((products) => {
        this.products = products.data;
      });
  }

  // Helper method to filter products based on selected brand and type
  filterProducts() {
    this.fetchProducts();
  }
}
