import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { LoginPageComponent } from './login-page.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
    declarations: [LoginPageComponent],
    providers: [],
    imports: [
        CommonModule,
        SharedModule,
        LoginRoutingModule
    ]
})
export class LoginModule { }