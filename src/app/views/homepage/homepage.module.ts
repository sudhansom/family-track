import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HomepageComponent } from "./homepage.component";

@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[],
  providers: [],
  bootstrap: [],
})
export class HomePageModule {}
