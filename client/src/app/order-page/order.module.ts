import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
        FormsModule,
        ReactiveFormsModule,
        ComponentModule,
        OrderRoutingModule
    ],
    providers: []
})

export class OrderModule { }