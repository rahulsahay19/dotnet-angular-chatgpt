import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
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
    CarouselModule.forRoot(),
    PaginationModule.forRoot()
  ],
  exports:[
    PaginationHeaderComponent,
    PaginationComponent,
    OrderTotalsComponent,
    PaginationModule,
    CarouselModule,

  ]
})
export class SharedModule { }
