import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { ProductItemComponent } from './store/product-item/product-item.component';

@NgModule({
  declarations: [
    StoreComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StoreComponent // Export the StoreComponent
  ]
})
export class StoreModule { }
