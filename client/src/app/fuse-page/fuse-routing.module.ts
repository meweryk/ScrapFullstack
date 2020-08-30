import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FusePageComponent } from "./fuse-page.component";

const fuseRoutes: Routes = [
  {
    path: '', component: FusePageComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(fuseRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FuseRoutingModule { }
