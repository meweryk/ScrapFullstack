import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { LoginPageComponent } from './login-page.component';
import { LoginRoutingModule } from './login-routing.module';
import { ComponentModule } from '../shared/components/components.module';

@NgModule({
  declarations: [LoginPageComponent],
  providers: [],
  imports: [
    CommonModule,
    SharedModule,
    ComponentModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
