import {
  BreakpointObserver,
  Breakpoints,
  MediaMatcher,
} from '@angular/cdk/layout';
import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LayoutService implements OnDestroy {
  handset$: Observable<{ matches: boolean }>;
  isHandset: boolean;

  small$: Observable<{ matches: boolean }>;
  private smallSubject: BehaviorSubject<{ matches: boolean }>;
  private smallQueryList: MediaQueryList;
  private smallListener: () => void;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private media: MediaMatcher
  ) {
    this.handset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => {
        this.isHandset = result.matches;
        return { matches: result.matches };
      })
    );

    this.smallQueryList = this.media.matchMedia('(max-width: 480px)');

    this.smallSubject = new BehaviorSubject<{ matches: boolean }>(
      this.smallQueryList
    );
    this.small$ = this.smallSubject.asObservable();
    this.smallListener = () => {
      this.smallSubject.next(this.smallQueryList);
    };
    this.smallQueryList.addListener(this.smallListener);
  }

  stickyToolbarListensToHandsetChange(
    toolbarContainer: ElementRef,
    componentUnsubscribe: Observable<unknown>
  ) {
    this.handset$
      .pipe(
        startWith({ matches: this.isHandset }),
        takeUntil(componentUnsubscribe)
      )
      .subscribe((handset) => {
        const tb = toolbarContainer.nativeElement;
        const indentStyle = 'toolbar-indent';
        handset.matches
          ? tb.classList.remove(indentStyle)
          : toolbarContainer.nativeElement.classList.add(indentStyle);
      });
  }

  ngOnDestroy() {
    this.smallQueryList.removeListener(this.smallListener);
  }
}
