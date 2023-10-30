import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from '../shared/models/Pagination';
import { Product } from '../shared/models/Product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl = 'http://localhost:5103/api/v1/Products';

  constructor(private http: HttpClient) {}

  // Modify the method to return Pagination<Product[]>
  getProducts(
    sort: string,
    skip: number,
    take: number,
    productBrandId: number,
    productTypeId: number 
  ): Observable<Pagination<Product>> {
    // Create HttpParams to build the query string
    let params = new HttpParams()
      .set('sort', sort)
      .set('skip', skip.toString())
      .set('take', take.toString());

    if (productBrandId !== 0) {
      params = params.set('productBrandId', productBrandId.toString());
    }

    if (productTypeId !== 0) {
      params = params.set('productTypeId', productTypeId.toString());
    }

    // Customize the URL with query parameters
    const url = `${this.apiUrl}`;
    
    return this.http.get<Pagination<Product>>(url, { params });
  }

  // Add a method to filter products based on brand and type
  filterProducts(brand: string | null, type: string | null): Product[] {
    // Implement the logic to filter products based on brand and type
    // For example, you can use Array.filter() method here
    // Return the filtered products as an array
    return [];
  }

  getBrands() {
    const url = `${this.apiUrl}/brands`;
    return this.http.get<Brand[]>(url);
  }

  getTypes() {
    const url = `${this.apiUrl}/types`;
    return this.http.get<Type[]>(url);
  }
}
