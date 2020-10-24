import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FuseCardComponent } from './fuse-card/fuse-card.component';
import { FusePageComponent } from "./fuse-page.component";

const fuseRoutes: Routes = [
  { path: '', component: FusePageComponent },
  { path: 'new', component: FuseCardComponent },
  { path: ':id', component: FuseCardComponent },
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
