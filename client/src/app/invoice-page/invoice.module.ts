import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicePageComponent } from './invoice-page.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentModule } from '../shared/components/components.module';
import { InvoiceRoutingModule } from './invoice-routing.module';

@NgModule({
    declarations: [
        InvoicePageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ComponentModule,
        InvoiceRoutingModule
    ],
    providers: [],
    exports: [InvoicePageComponent]
})

export class InvoiceModule { }
