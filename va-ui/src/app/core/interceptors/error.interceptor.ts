import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogService } from '@app/core/services/dialog.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialogService: DialogService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        const url = request.url;
        let error: string;
        if (url) {
          if (url.endsWith('/login') || url.endsWith('/users/password')) {
            error = this.getErrorMessage(err, 'Invalid credentials');
          } else if (url.includes('/auth/')) {
            if (err.status === 401) {
              error = 'You are not authorized to this application';
            } else {
              error = this.getErrorMessage(err, 'Login Failed');
            }
          } else if (err.status === 401 || err.status === 403) {
            return throwError('Unauthorized');
          }
        }
        if (error === undefined) {
          error = this.getErrorMessage(err, 'An error has occurred');
          this.dialogService.alert(error);
        }
        console.error(err);
        return throwError(error);
      })
    );
  }

  private getErrorMessage(err: any, defaultMessage: string) {
    return (
      (err.error && err.error.error && err.error.error.message) ||
      (err.status === 422 ? 'Invalid data' : err.statusText) ||
      defaultMessage
    );
  }
}
