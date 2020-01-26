import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentModule } from '../shared/components/components.module';
import { DeliveriesRoitingModule } from './deliveries-routing.module';
import { DeliveriesFormComponent } from './deliveries-form/deliveries-form.component';
import { DeliveriesPageComponent } from './deliveries-page.component';

@NgModule({
    declarations: [
        DeliveriesPageComponent,
        DeliveriesFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ComponentModule,
        DeliveriesRoitingModule
    ],
    providers: []
})

export class DeliveriesModule { }