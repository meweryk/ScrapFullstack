import { NgModule } from "@angular/core";
import { FusePageComponent } from "./fuse-page.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { ComponentModule } from "../shared/components/components.module";
import { FuseRoutingModule } from "./fuse-routing.module";

@NgModule({
  declarations: [FusePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ComponentModule,
    FuseRoutingModule
  ],
  providers: []
})

export class FuseModule { }
