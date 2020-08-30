import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { AuthGuard } from './shared/classes/auth.guard'

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', loadChildren: () => import('./login-page/login.module').then(m => m.LoginModule) },
      { path: 'register', loadChildren: () => import('./register-page/register.module').then(m => m.RegisterModule) }
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'overview', loadChildren: () => import('./overview-page/overview.module').then(m => m.OverviewModule) },
      { path: 'analytics', loadChildren: () => import('./analytics-page/analytics.module').then(m => m.AnalyticsModule) },
      { path: 'history', loadChildren: () => import('./history-page/history.module').then(m => m.HistoryModule) },
      { path: 'order', loadChildren: () => import('./order-page/order.module').then(m => m.OrderModule) },
      { path: 'categories', loadChildren: () => import('./categories-page/categories.module').then(m => m.CategoriesModule) },
      { path: 'deliveries', loadChildren: () => import('./deliveries-page/deliveries.module').then(m => m.DeliveriesModule) },
      { path: 'materials', loadChildren: () => import('./materials-page/materials.module').then(m => m.MaterialsModule) },
      { path: 'invoice', loadChildren: () => import('./invoice-page/invoice.module').then(m => m.InvoiceModule) },
      { path: 'fuse', loadChildren: () => import('./fuse-page/fuse.module').then(m => m.FuseModule) },
      { path: '**', redirectTo: '/order' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
