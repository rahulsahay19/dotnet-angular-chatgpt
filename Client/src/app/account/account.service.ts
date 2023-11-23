import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:5103/api/Account/';
  private userSource = new BehaviorSubject<User | null>(null);
  userSource$ = this.userSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Method for user login
  login(loginModel: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}login`, loginModel).pipe(
      // Store token in localStorage and notify via userSource
      map((user) => {
        if (user?.token) {
          localStorage.setItem('token', user.token);
          this.userSource.next(user);
        }
        return user;
      })
    );
  }

  // Method for user registration
  register(registerModel: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}register`, registerModel).pipe(
      // Store token in localStorage and notify via userSource
      map((user) => {
        if (user?.token) {
          localStorage.setItem('token', user.token);
          this.userSource.next(user);
        }
        return user;
      })
    );
  }

  // Method to check if an email is available
  checkEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}checkemail?email=${email}`);
  }

  // Method to logout the user
  logout() {
    localStorage.removeItem('token');
    this.userSource.next(null);
    this.router.navigate(['/']); // You can navigate to any desired route after logout
  }
}
