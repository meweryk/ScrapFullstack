import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveriesPageComponent } from './deliveries-page.component';
import { DeliveryComponent } from './delivery/delivery.component';

const deliveriesRoutes: Routes = [
    { path: '', component: DeliveriesPageComponent },
    { path: '/new', component: DeliveryComponent }
]

@NgModule({
    imports: [RouterModule.forChild(deliveriesRoutes)],
    exports: [RouterModule]
})

export class DeliveriesRoitingModule { }