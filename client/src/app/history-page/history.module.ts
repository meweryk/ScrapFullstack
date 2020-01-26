import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HistoryPageComponent } from './history-page.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { HistoryFilterComponent } from './history-filter/history-filter.component';
import { ComponentModule } from '../shared/components/components.module';
import { HistoryRoutingModule } from './history-routing.module';


@NgModule({
    declarations: [
        HistoryPageComponent,
        HistoryListComponent,
        HistoryFilterComponent
    ],
    providers: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        HistoryRoutingModule,
        ComponentModule
    ]
})

export class HistoryModule { }