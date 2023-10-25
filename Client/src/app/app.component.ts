import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './models/Product';
import { Pagination } from './models/Pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Sports Center';
  products: Product[] = [];
  pagination: Pagination | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Pagination>('http://localhost:5103/api/v1/Products?sort=NameAsc&skip=0&take=10')
      .subscribe({
        next: (data) => {
          this.pagination = data;
          this.products = data.data; // Extract the products from the pagination response
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
      });
  }
}
