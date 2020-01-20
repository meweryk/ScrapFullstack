import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentModule } from '../shared/components/components.module';
import { DeliveriesRoitingModule } from './deliveries-routing.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ComponentModule,
        DeliveriesRoitingModule
    ],
    providers: []
})

export class DeliveriesModule { }