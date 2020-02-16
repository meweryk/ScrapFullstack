import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HistoryPageComponent } from './history-page.component';
import { InvoicePageComponent } from '../invoice-page/invoice-page.component';

const historyRoutes: Routes = [
    { path: '', component: HistoryPageComponent },
    { path: '/invoice', component: InvoicePageComponent }
]

@NgModule({
    imports: [RouterModule.forChild(historyRoutes)],
    exports: [RouterModule]
})

export class HistoryRoutingModule { }