import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from '../shared/models/Pagination';
import { Product } from '../shared/models/Product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { StoreParams } from '../shared/models/storeParams';


@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl = 'http://localhost:5103/api/v1/Products/';

  constructor(private http: HttpClient) {}

  // Modify the method to return Pagination<Product[]>
  getProducts(params: StoreParams): Observable<Pagination<Product>> {
    // Create HttpParams to build the query string
    let httpParams = new HttpParams()
      .set('sort', params.selectedSort)
      .set('skip', params.skip.toString())
      .set('take', params.take.toString());

    if (params.productBrandId !== 0) {
      httpParams = httpParams.set('productBrandId', params.productBrandId.toString());
    }

    if (params.productTypeId !== 0) {
      httpParams = httpParams.set('productTypeId', params.productTypeId.toString());
    }

    if (params.search) {
      httpParams = httpParams.set('search', params.search); // Add the search parameter to the query
    }
    
    httpParams = httpParams.set('pageIndex', params.pageNumber);
    httpParams = httpParams.set('pageSize', params.pageSize);

    // Customize the URL with query parameters
    const url = `${this.apiUrl}`;

    return this.http.get<Pagination<Product>>(url, { params: httpParams });
  }

  getProduct(id:number){
    return this.http.get<Product>(this.apiUrl + id);
  }
  // Add a method to filter products based on brand and type
  filterProducts(brand: string | null, type: string | null): Product[] {
    // Implement the logic to filter products based on brand and type
    // For example, you can use Array.filter() method here
    // Return the filtered products as an array
    return [];
  }

  getBrands() {
    const url = `${this.apiUrl}brands`;
    return this.http.get<Brand[]>(url);
  }

  getTypes() {
    const url = `${this.apiUrl}types`;
    return this.http.get<Type[]>(url);
  }
}
