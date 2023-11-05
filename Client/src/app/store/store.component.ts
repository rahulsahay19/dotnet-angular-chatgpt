import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from './store.service';
import { Product } from '../shared/models/Product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { StoreParams } from '../shared/models/storeParams';
import { ToastrService } from 'ngx-toastr';

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
  params: StoreParams = new StoreParams();
  totalCount = 0;
  constructor(private storeService: StoreService, private toastr: ToastrService) {}

  ngOnInit() {
    this.getBrands();
    this.getTypes();
    this.fetchProducts();
  }

  selectBrand(brandId: number) {
    this.params.productBrandId = brandId;
    this.fetchProducts();
  }

  selectType(typeId: number) {
    this.params.productTypeId = typeId;
    this.fetchProducts();
  }

  onSortChange() {
    // Trigger a fetch of products when the sorting changes
    this.fetchProducts();
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
    this.storeService.getProducts(this.params).subscribe((products) => {
      this.products = products.data;
      this.params.originalProducts = [...this.products]; // Store the original products
      this.params.pageNumber = products.pageIndex;
      this.params.pageSize = products.pageSize;
      this.totalCount = products.totalItems;        
      this.toastr.success('Products fetched'); 
    });
    
  }

  searchProducts() {
    // Filter the products based on the search input
    this.products = this.params.originalProducts.filter((product) =>
      product.name.toLowerCase().includes(this.params.search.toLowerCase())
    );
    this.totalCount = this.products.length;
  }

  resetFilters() {
    // Reset the search input, reset pagination, and fetch the original list of products
    this.params.search = '';
    this.params.pageNumber = 1;
    this.fetchProducts();
  }

  onPageChanged(event: any) {
    // Handle pagination page change
    this.params.pageNumber = event;
    this.fetchProducts();
  }
}
