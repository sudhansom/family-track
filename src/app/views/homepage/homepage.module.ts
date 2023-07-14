import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';

import { HomepageComponent } from "./homepage.component";
import { PersonModule } from "src/app/components/person/person.module";
import { DisplayAllModule } from "src/app/components/display-all/display-all.module";
import { ModalFormModule } from "src/app/components/modal-form/modal-form.module";

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
    DisplayAllModule,
    ModalFormModule,
  ],
  exports:[],
  providers: [],
  bootstrap: [],
})
export class HomePageModule {}
