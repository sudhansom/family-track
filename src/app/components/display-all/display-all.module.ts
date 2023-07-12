import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { DisplayAllComponent } from "./display-all.component";

@NgModule({
  declarations: [
    DisplayAllComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[DisplayAllComponent],
  providers: [],
  bootstrap: [],
})
export class DisplayAllModule {}
