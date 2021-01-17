import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@app/shared/shared.module';
import { AppLocator } from './app-locator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  imports: [BrowserModule, CoreModule, SharedModule, AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {
  constructor(private injector: Injector) {
    AppLocator.injector = injector;
  }
}
