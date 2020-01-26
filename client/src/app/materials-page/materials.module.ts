import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
        FormsModule,
        ReactiveFormsModule,
        ComponentModule,
        MaterialsRoutingModule
    ]
})

export class MaterialsModule { }