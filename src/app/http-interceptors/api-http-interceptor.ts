import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newReq = req.clone({
      headers: req.headers
        .set('Content-Type', 'application/json')
        .set('X-Requested-With', 'XMLHttpRequest'),
    });
    return next.handle(newReq);
  }
}
