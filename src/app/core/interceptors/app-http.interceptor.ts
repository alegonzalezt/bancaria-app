import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('auth_token')) {
      const token = `Token ${localStorage.getItem('auth_token')}`;

      const headers = request.clone({
        headers: request.headers.set('Authorization', token),
      });

      return next.handle(headers);
    }
    return next.handle(request);
  }
}
