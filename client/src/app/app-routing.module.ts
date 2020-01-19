import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { OrderPageComponent } from './order-page/order-page.component';
import { OrderCategoriesComponent } from './order-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from './order-page/order-positions/order-positions.component';
import { DeliveriesPageComponent } from './deliveries-page/deliveries-page.component';


const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent }
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'overview', loadChildren: () => import('./overview-page/overview.module').then(m => m.OverviewModule) },
      { path: 'analytics', loadChildren: () => import('./analytics-page/analytics.module').then(m => m.AnalyticsModule) },
      { path: 'history', loadChildren: () => import('./history-page/history.module').then(m => m.HistoryModule) },
      { path: 'categories', loadChildren: () => import('./categories-page/categories.module').then(m => m.CategoriesModule) },
      { path: 'materials', loadChildren: () => import('./materials-page/materials.module').then(m => m.MaterialsModule) },

      {
        path: 'order', component: OrderPageComponent, children: [
          { path: '', component: OrderCategoriesComponent },
          { path: ':id', component: OrderPositionsComponent }
        ]
      },

      { path: 'deliveries', component: DeliveriesPageComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
