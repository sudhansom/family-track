import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomepageComponent } from "./homepage.component";
import { PersonModule } from "src/app/components/person/person.module";

const appRoutes: Routes = [
  {
    path: '',
    component: HomepageComponent
  }
]

@NgModule({
  declarations: [
    HomepageComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    PersonModule,
  ],
  exports:[],
  providers: [],
  bootstrap: [],
})
export class HomePageModule {}
