import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './order-totals/order-totals.component';

@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationComponent,
    OrderTotalsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
    MatInputModule
  ],
  exports:[
    PaginationHeaderComponent,
    PaginationComponent,
    OrderTotalsComponent,
    PaginationModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class SharedModule { }
