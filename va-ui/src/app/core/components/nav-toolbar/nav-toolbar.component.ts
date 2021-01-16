import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LayoutService } from '@app/core/services/layout.service';
import { NavToolbarService } from '@app/core/services/nav-toolbar.service';
import { NavigationService } from '@app/core/services/navigation.service';
import { RouterLocationService } from '@app/core/services/router-location.service';
import { ResourceBundle } from '@app/shared/common/resource-bundle';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.css'],
})
export class NavToolbarComponent implements OnInit {
  @Input()
  heading: string;

  @Input()
  subHeading: string;

  @Input()
  enableDrawerToggle: boolean;

  @Input()
  enableHome: boolean;

  @Input()
  enableMap: boolean;

  @Input()
  enableSubscribe: boolean;

  @Input()
  enableLocator: boolean;

  @Input()
  enableAppointment: boolean;

  @Input()
  enableBack: boolean;

  @Input()
  enableForward: boolean;

  @Input()
  enableVirtualKeyboardToggle: boolean;

  @Input()
  enableSearch: boolean;

  @Input()
  enableSettings: boolean;

  @Input()
  enableBrowse: boolean;

  @Input()
  enableRandom: boolean;

  @Input()
  enableContests: boolean;

  @Input()
  enableFlashcards: boolean;

  @Input()
  enableResources: boolean;

  @Input()
  enableEditToggle: boolean;

  @Output()
  sideNavToggle = new EventEmitter();

  @Output()
  back = new EventEmitter();

  res = ResourceBundle;

  constructor(
    private navToolbarService: NavToolbarService,
    public layoutService: LayoutService,
    private toolbarService: NavToolbarService,
    public routerLocationService: RouterLocationService,
    public navigationService: NavigationService
  ) {
    this.toolbarService.instance = this;
    this.resetToDefault();
  }

  ngOnInit() {}

  resetToDefault() {
    this.heading = 'Vaccine Alerts';
    // this.subHeading = 'Stay alert to Covid-19 vaccines';
    this.enableHome = true;
    this.enableMap = true;
    this.enableSubscribe = true;
    this.enableLocator = true;
    this.enableAppointment = true;
    this.enableBack = true;
    this.enableForward = false;
    this.enableSearch = true;
    this.enableBrowse = true;
    this.enableRandom = true;
    this.enableContests = true;
    this.enableFlashcards = true;
    this.enableResources = true;
    this.enableEditToggle = false;
    this.enableVirtualKeyboardToggle = false;
    this.enableSettings = false;
  }

  onSideNavToggle() {
    this.sideNavToggle.emit();
  }

  isEditModeEnabled() {
    return this.navToolbarService.isEditModeEnabled();
  }

  onEditToggleChange(event: MatSlideToggleChange) {
    this.navToolbarService.enableEditMode(event.checked);
  }

  onBack() {
    this.routerLocationService.back(['/']);
  }

  onForward() {
    this.routerLocationService.forward();
  }
}
