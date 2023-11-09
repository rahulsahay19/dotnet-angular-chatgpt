import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/Product';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantity: number = 1; 
  constructor(private storeService: StoreService, private activatedRoute: ActivatedRoute, private breadCrumbService: BreadcrumbService){}

  ngOnInit(): void {
    this.loadProduct();
  }
  
  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.storeService.getProduct(+id).subscribe({
        next: product =>{
          this.product = product;
          this.breadCrumbService.set('@productName', product.name);
        }, 
        error: error => console.log(error)
      });
    }
  }

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
 // Method to increment the quantity
 incrementQuantity() {
  this.quantity++;
}

// Method to decrement the quantity (prevent negative values)
decrementQuantity() {
  if (this.quantity > 1) {
    this.quantity--;
  }
}
}
