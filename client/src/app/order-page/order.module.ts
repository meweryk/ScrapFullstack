import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ComponentModule } from '../shared/components/components.module';
import { OrderPageComponent } from './order-page.component';
import { OrderCategoriesComponent } from './order-categories/order-categories.component';
import { OrderPositionsComponent } from './order-positions/order-positions.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
    declarations: [
        OrderPageComponent,
        OrderCategoriesComponent,
        OrderPositionsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ComponentModule,
        OrderRoutingModule
    ],
    providers: []
})

export class OrderModule { }