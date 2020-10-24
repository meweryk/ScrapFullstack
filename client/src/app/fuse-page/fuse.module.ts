import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

import { ComponentModule } from "../shared/components/components.module";
import { FuseRoutingModule } from "./fuse-routing.module";
import { FusePageComponent } from "./fuse-page.component";
import { FuseCardComponent } from './fuse-card/fuse-card.component';

@NgModule({
  declarations: [FusePageComponent, FuseCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    ComponentModule,
    FuseRoutingModule
  ],
  providers: []
})

export class FuseModule { }
