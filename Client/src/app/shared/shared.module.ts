import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationComponent
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
    PaginationModule,
    CarouselModule,

  ]
})
export class SharedModule { }
