import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPageComponent } from './register-page.component';

const registerRoutes: Routes = [
    { path: '', component: RegisterPageComponent }
]

@NgModule({
    imports: [RouterModule.forChild(registerRoutes)],
    exports: []
})

export class RegisterRoutingModule {

}