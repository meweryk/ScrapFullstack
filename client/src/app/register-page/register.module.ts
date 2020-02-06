import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RegisterPageComponent } from './register-page.component';
import { RegisterRoutingModule } from './register-routing.module';


@NgModule({
    declarations: [
        RegisterPageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RegisterRoutingModule
    ],
    providers: [],

})

export class RegisterModule { }