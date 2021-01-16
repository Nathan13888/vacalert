import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingIndicatorService } from '../services/loading-indicator.service';

@Injectable()
export class LoadingIndicatorInterceptor implements HttpInterceptor {
  activeRequests = 0;

  /**
   * URLs for which the loading screen should be disabled if any
   */
  skippUrls = [
    // '/authrefresh',
  ];

  constructor(private loadingIndicatorService: LoadingIndicatorService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let displayLoadingIndicator = true;

    for (const skippUrl of this.skippUrls) {
      if (new RegExp(skippUrl).test(request.url)) {
        displayLoadingIndicator = false;
        break;
      }
    }

    if (displayLoadingIndicator) {
      if (this.activeRequests === 0) {
        this.loadingIndicatorService.startLoading();
      }
      this.activeRequests++;

      return next.handle(request).pipe(
        finalize(() => {
          this.activeRequests--;
          if (this.activeRequests === 0) {
            this.loadingIndicatorService.stopLoading();
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
