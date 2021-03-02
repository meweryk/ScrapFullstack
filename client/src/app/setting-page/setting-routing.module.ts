import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingPageComponent } from './setting-page.component';

const settingRoutes: Routes = [
  { path: '', component: SettingPageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(settingRoutes)],
  exports: []
})
export class SettingRoutingModule { }
