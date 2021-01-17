import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  navigate(url: string, params?: any) {
    this.router.navigate(params ? [url, params] : [url]);
  }

  getAbsoluteUrl(routerLink: any[]) {
    const base = window.location.origin;
    return base + this.router.createUrlTree(routerLink).toString();
  }
}
