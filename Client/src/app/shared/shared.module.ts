import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  exports:[
    PaginationHeaderComponent,
    PaginationComponent,
    PaginationModule
  ]
})
export class SharedModule { }
