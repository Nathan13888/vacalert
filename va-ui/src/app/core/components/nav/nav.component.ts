import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { NavToolbarComponent } from '@app/core/components/nav-toolbar/nav-toolbar.component';
import { LayoutService } from '@app/core/services/layout.service';
import { NavToolbarService } from '@app/core/services/nav-toolbar.service';
import { NavigationService } from '@app/core/services/navigation.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent extends BaseComponent {
  heading = '';

  @ViewChild(NavToolbarComponent)
  toolbar: NavToolbarComponent;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(
    public layoutService: LayoutService,
    public navToolbarService: NavToolbarService,
    private router: Router,
    public navigationService: NavigationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        if (this.layoutService.isHandset && this.sidenav) {
          this.sidenav.close();
        }
      });
  }

  onSideNavClick() {
    if (this.layoutService.isHandset && this.sidenav) {
      this.sidenav.close();
    }
  }
}
