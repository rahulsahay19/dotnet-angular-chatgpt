import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            // Handle 404 (Not Found) error
            console.log('in-here')
            this.toastr.error('Page not found!', 'Error'); // Display error message using Toastr
            this.router.navigate(['/not-found']);
            
          } else if (error.status === 500) {
            // Handle 500 (Server Error) error
            this.router.navigate(['/server-error']);
            this.toastr.error('Server error!', 'Error'); // Display error message using Toastr
          } else if (error.status === 0) {
            // Handle connection refused or no network error
            this.router.navigate(['/connection-error']);
            this.toastr.error('Connection error!', 'Error'); // Display error message using Toastr
          }
        }
        // Pass the error along to the next error handling middleware
        throw error;
      })
    );
  }
}
