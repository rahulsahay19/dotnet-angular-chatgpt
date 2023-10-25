import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';

@NgModule({
  declarations: [
    StoreComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StoreComponent // Export the StoreComponent
  ]
})
export class StoreModule { }
