import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewPageComponent } from './overview-page.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { ComponentModule } from '../shared/components/components.module';

@NgModule({
    declarations: [
        OverviewPageComponent
    ],
    providers: [],
    imports: [
        CommonModule,
        OverviewRoutingModule,
        ComponentModule
    ]
})

export class OverviewModule { }