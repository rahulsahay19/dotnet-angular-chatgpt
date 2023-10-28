import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from '../shared/models/Pagination';
import { Product } from '../shared/models/Product';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl = 'http://localhost:5103/api/v1/Products';

  constructor(private http: HttpClient) {}

  // Modify the method to return Pagination<Product[]>
  getProducts(sort: string, skip: number, take: number): Observable<Pagination<Product>> {
    // Customize the URL and parameters as needed
    const url = `${this.apiUrl}?sort=${sort}&skip=${skip}&take=${take}`;
    return this.http.get<Pagination<Product>>(url);
  }
   // Add a method to filter products based on brand and type
   filterProducts(brand: string | null, type: string | null): Product[] {
    // Implement the logic to filter products based on brand and type
    // For example, you can use Array.filter() method here
    // Return the filtered products as an array
    return [];
   }
}
