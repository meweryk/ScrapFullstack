import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialsPageComponent } from './materials-page.component';

const materialsRoutes: Routes = [
  { path: '', component: MaterialsPageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(materialsRoutes)],
  exports: [RouterModule]
})

export class MaterialsRoutingModule { }
