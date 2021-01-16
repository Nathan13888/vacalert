import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './core/components/nav/nav.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    // canActivate: [AuthGuard],
  },
  {
    path: '',
    component: NavComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((module) => module.HomeModule),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    //  canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'disabled',
      // anchorScrolling: "enabled",
      onSameUrlNavigation: 'reload',
      enableTracing: false,
      relativeLinkResolution: 'legacy',
    }),
  ],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
