import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  // gotoSearch(query?: SearchURLQuery) {
  //   this.router.navigate(this.searchLink(query));
  // }

  // searchLink(query?: SearchURLQuery) {
  //   query = query || {};
  //   Object.keys(query).forEach((key) => !query[key] && delete query[key]);
  //   const baseUrl = Paths.getSearchURL();
  //   return [baseUrl, query];
  // }

  // browseLink() {
  //   return Paths.getBrowseURL();
  // }

  // groupTypeLink() {
  //   const baseUrl = Paths.getBrowseURL();
  //   return [baseUrl];
  // }

  // groupTypeQueryParams(groupType: string) {
  //   return { gt: groupType };
  // }

  // groupLink(id: string) {
  //   const baseUrl = Paths.getSearchURL();
  //   return [baseUrl, { gid: id }];
  // }

  // challengeLink(id: string) {
  //   const baseUrl = Paths.getSearchURL();
  //   return [baseUrl, { cid: id }];
  // }

  // problemLink(id: string, flashcard: boolean) {
  //   const url = Paths.getProblemURL(flashcard);
  //   return [url, id];
  // }

  // gotoProblem(id: string, flashcard: boolean) {
  //   this.router.navigate(this.problemLink(id, flashcard));
  // }

  navigate(url: string, params?: any) {
    this.router.navigate(params ? [url, params] : [url]);
  }

  getAbsoluteUrl(routerLink: any[]) {
    const base = window.location.origin;
    return base + this.router.createUrlTree(routerLink).toString();
  }
}
