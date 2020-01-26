import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveriesPageComponent } from './deliveries-page.component';

const deliveriesRoutes: Routes = [
    { path: '', component: DeliveriesPageComponent }
]

@NgModule({
    imports: [RouterModule.forChild(deliveriesRoutes)],
    exports: [RouterModule]
})

export class DeliveriesRoitingModule { }