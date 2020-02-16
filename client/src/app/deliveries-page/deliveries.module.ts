import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentModule } from '../shared/components/components.module';
import { DeliveriesRoitingModule } from './deliveries-routing.module';
import { DeliveriesPageComponent } from './deliveries-page.component';
import { DeliveryComponent } from './delivery/delivery.component';

@NgModule({
    declarations: [
        DeliveriesPageComponent,
        DeliveryComponent
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