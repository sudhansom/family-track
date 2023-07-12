import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HomepageComponent } from "./homepage.component";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  {
    path: '',
    component: HomepageComponent
  }
]

@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
  ],
  exports:[],
  providers: [],
  bootstrap: [],
})
export class HomePageModule {}
