import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewPageComponent } from './overview-page.component';

const overviewRoutes: Routes = [
    { path: '', component: OverviewPageComponent },
]

@NgModule({
    imports: [RouterModule.forChild(overviewRoutes)],
    exports: [RouterModule]
})

export class OverviewRoutingModule { }