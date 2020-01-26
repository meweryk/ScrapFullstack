import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoriesPageComponent } from './categories-page.component';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { PositionsFormComponent } from './categories-form/positions-form/positions-form.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { ComponentModule } from '../shared/components/components.module';


@NgModule({
    declarations: [
        CategoriesPageComponent,
        CategoriesFormComponent,
        PositionsFormComponent,
    ],
    providers: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CategoriesRoutingModule,
        ComponentModule
    ]
})

export class CategoriesModule { }