import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Sports Center';
  products: any[] = []; // Define a variable to store fetched products

  constructor(private http: HttpClient) {} // Inject HttpClient

  ngOnInit() {
    // Make an HTTP GET request to your API URL
    this.http.get<any[]>('http://localhost:5103/api/v1/Products?sort=NameAsc&skip=0&take=10').subscribe(
      (data) => {
        this.products = data; // Store the fetched data in the products variable
        console.log(this.products);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
