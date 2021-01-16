import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { asyncScheduler } from 'rxjs';
import { filter, observeOn, scan, takeUntil } from 'rxjs/operators';
import { RouterLocationService } from './core/services/router-location.service';
import { BaseComponent } from './shared/components/base/base.component';

interface ScrollPositionRestore {
  event: Event;
  positions: { [K: number]: number };
  trigger: 'imperative' | 'popstate' | 'hashchange';
  idToRestore: number;
  state: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends BaseComponent {
  constructor(
    private routerLocationService: RouterLocationService,
    private viewportScroller: ViewportScroller,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.setUpPositionRestore();
  }

  private setUpPositionRestore() {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart || event instanceof NavigationEnd
        ),
        scan<Event, ScrollPositionRestore>((acc, event) => {
          const obj = {
            event,
            positions: {
              ...acc.positions,
              ...(event instanceof NavigationStart
                ? {
                    [event.id]: this.viewportScroller.getScrollPosition()[1],
                  }
                : {}),
            },
            trigger:
              event instanceof NavigationStart
                ? event.navigationTrigger
                : acc.trigger,
            idToRestore:
              (event instanceof NavigationStart &&
                event.restoredState &&
                event.restoredState.navigationId + 1) ||
              acc.idToRestore,
            state: this.router.getCurrentNavigation()?.extras.state,
          };
          return obj;
        }),
        filter(
          ({ event, trigger }) => event instanceof NavigationEnd && !!trigger
        ),
        observeOn(asyncScheduler, 200),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ trigger, positions, idToRestore, state }) => {
        if (trigger === 'imperative') {
          const disableScrollToTop = state && state.disableScrollToTop;
          if (!disableScrollToTop) {
            this.viewportScroller.scrollToPosition([0, 0]);
          }
        }
        if (trigger === 'popstate') {
          const pos: number = positions[idToRestore];
          if (pos) {
            this.scrollRecursively(pos, 0);
          }
        }
      });
  }

  private scrollRecursively(pos: number, count: number) {
    if (count < 10) {
      this.viewportScroller.scrollToPosition([0, pos]);
      const newPos = this.viewportScroller.getScrollPosition()[1];
      if (Math.abs(newPos - pos) > 100) {
        setTimeout(() => this.scrollRecursively(pos, count + 1), 200);
      }
    }
  }
}
