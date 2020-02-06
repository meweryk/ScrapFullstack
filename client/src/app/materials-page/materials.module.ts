import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { MaterialsPageComponent } from './materials-page.component';
import { MaterialsFilterComponent } from './materials-filter/materials-filter.component';
import { ComponentModule } from '../shared/components/components.module';
import { MaterialsRoutingModule } from './materials-routing.module';

@NgModule({
    declarations: [
        MaterialsPageComponent,
        MaterialsFilterComponent
    ],

    providers: [],

    imports: [
        CommonModule,
        SharedModule,
        ComponentModule,
        MaterialsRoutingModule
    ]
})

export class MaterialsModule { }