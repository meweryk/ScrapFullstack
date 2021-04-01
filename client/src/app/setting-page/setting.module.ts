import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'
import { ComponentModule } from '../shared/components/components.module'
import { SettingPageComponent } from '../setting-page/setting-page.component'
import { SettingRoutingModule } from './setting-routing.module';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    SettingPageComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentModule,
    SettingRoutingModule
  ],
  providers: [],
})

export class SettingModule { }
