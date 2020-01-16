import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsPageComponent } from './analytics-page.component';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { ComponentModule } from '../shared/components/components.module';

@NgModule({
    declarations: [
        AnalyticsPageComponent
    ],
    providers: [
        AnalyticsService
    ],
    imports: [
        CommonModule,
        AnalyticsRoutingModule,
        ComponentModule
    ]
})
export class AnalyticsModule { }