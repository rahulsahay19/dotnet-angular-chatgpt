// loading.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private requests: number = 0;
    constructor(private loadingService: LoadingService){}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.loading();

    return next.handle(request).pipe(
      delay(1000),
      finalize(()=> this.loadingService.idle())
    );
  }

  isLoading(): boolean {
    return this.requests > 0;
  }
}
