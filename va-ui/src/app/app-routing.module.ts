import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './core/components/appointment/appointment.component';
import { HomeComponent } from './core/components/home/home.component';
import { LocatorComponent } from './core/components/locator/locator.component';
import { MapComponent } from './core/components/map/map.component';
import { NavComponent } from './core/components/nav/nav.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SubscribeComponent } from './core/components/subscribe/subscribe.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'map',
        component: MapComponent,
      },
      {
        path: 'subscribe',
        component: SubscribeComponent,
      },
      {
        path: 'locator',
        component: LocatorComponent,
      },
      {
        path: 'appointment',
        component: AppointmentComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'disabled',
      onSameUrlNavigation: 'reload',
      enableTracing: false,
      relativeLinkResolution: 'legacy',
    }),
  ],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
