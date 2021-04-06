import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingPageComponent } from './setting-page.component';
import { CanDeactivateGuard } from './can-deactivate.guard'

const settingRoutes: Routes = [
  { path: '', component: SettingPageComponent, canDeactivate: [CanDeactivateGuard] }
]

@NgModule({
  imports: [RouterModule.forChild(settingRoutes)],
  exports: []
})
export class SettingRoutingModule { }
