import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface CanGoBackEvent {
  value: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class RouterLocationService {
  private previousUrl: string;
  private currentUrl: string;

  canGoBack$ = new ReplaySubject<CanGoBackEvent>();

  constructor(public location: Location, private router: Router) {
    this.canGoBack$.next({ value: false });
    this.canGoBack$;
    router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const canGoBack = this.canGoBack();
        const currentUrl = event.urlAfterRedirects;
        if (this.currentUrl === undefined || currentUrl !== this.currentUrl) {
          this.previousUrl = this.currentUrl;
          this.currentUrl = currentUrl;
        }
        const newValue = this.canGoBack();
        if (newValue !== canGoBack) {
          this.canGoBack$.next({ value: newValue });
        }
      });
  }

  private canGoBack() {
    return !!this.previousUrl;
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }

  public getCurrentUrl() {
    return this.currentUrl;
  }

  public back(defaultNavigation?: any[]): boolean {
    if (this.getPreviousUrl()) {
      this.location.back();
      return true;
    }
    if (defaultNavigation) {
      this.router.navigate(defaultNavigation);
      return true;
    }
    return false;
  }

  public forward() {
    this.location.forward();
  }

  public home() {
    this.router.navigate(['/']);
  }
}
