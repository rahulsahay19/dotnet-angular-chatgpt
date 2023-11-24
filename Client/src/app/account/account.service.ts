import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../shared/models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:5103/api/Account';
  private userSource = new BehaviorSubject<User | null>(null);
  userSource$ = this.userSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  loadUser(token: string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}`, { headers }).pipe(
      map((user) => {
        if (user?.token) {
          localStorage.setItem('token', user.token);
          this.userSource.next(user);
        }
        return user;
      }),
      catchError((error) => {
        console.error('Error loading user:', error);
  
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            console.error('User not found:', error);
            // Handle the 404 error here, e.g., redirect to a login page or show an error message.
          }
        }
  
        // Rethrow the error to propagate it to the caller
        return throwError(() => error);
      })
    );
  }
  
  
  
  // Method for user login
  login(loginModel: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, loginModel).pipe(
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
    return this.http.post<User>(`${this.apiUrl}/register`, registerModel).pipe(
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
