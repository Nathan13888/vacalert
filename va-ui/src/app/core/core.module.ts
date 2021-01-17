import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiModule, BASE_PATH } from '@app/api';
import { LoadingIndicatorComponent } from '@app/core/components/loading-indicator/loading-indicator.component';
import { NavToolbarComponent } from '@app/core/components/nav-toolbar/nav-toolbar.component';
import { NavComponent } from '@app/core/components/nav/nav.component';
import { NotFoundComponent } from '@app/core/components/not-found/not-found.component';
import { ErrorInterceptor } from '@app/core/interceptors/error.interceptor';
import { LoadingIndicatorInterceptor } from '@app/core/interceptors/loading.interceptor';
import { AlertDialogComponent } from '@app/shared/components/alert-dialog/alert-dialog.component';
import { SharedModule } from '@app/shared/shared.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { ISlimScrollOptions, SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { QuestionaireComponent } from './components/questionaire/questionaire.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { CoreRoutingModule } from './core-routing.module';
import { MapPopoverComponent } from './components/map-popover/map-popover.component';
import { LocatorComponent } from './components/locator/locator.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { LocationInfoComponent } from './components/location-info/location-info.component';
import { FinaleComponent } from './components/finale/finale.component';

@NgModule({
  declarations: [
    NavComponent,
    LoadingIndicatorComponent,
    NavToolbarComponent,
    NotFoundComponent,
    AlertDialogComponent,
    QuestionaireComponent,
    HomeComponent,
    MapComponent,
    SubscribeComponent,
    MapPopoverComponent,
    LocatorComponent,
    AppointmentComponent,
    LocationInfoComponent,
    FinaleComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ApiModule,
    SharedModule,
    CoreRoutingModule,
    InlineSVGModule.forRoot(),
  ],
  exports: [],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'standard' },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingIndicatorInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH },

    {
      provide: SLIMSCROLL_DEFAULTS,
      useValue: {
        alwaysVisible: false,
        gridOpacity: '0.2',
        barOpacity: '0.5',
        gridBackground: '#c2c2c2',
        gridWidth: '6',
        gridMargin: '2px 2px',
        barBackground: '#2C3E50',
        barWidth: '6',
        barMargin: '2px 2px',
      } as ISlimScrollOptions,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`
      );
    }
  }
}
