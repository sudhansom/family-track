import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { DisplayAllComponent } from "./display-all.component";
import { SvgIconModule } from "src/app/directives/svg-icon/svg-icon.module";

@NgModule({
  declarations: [
    DisplayAllComponent
  ],
  imports: [
    CommonModule,
    SvgIconModule,
  ],
  exports:[DisplayAllComponent],
  providers: [],
  bootstrap: [],
})
export class DisplayAllModule {}
