import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { PersonComponent } from "./person.component";

@NgModule({
  declarations: [
    PersonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[PersonComponent],
  providers: [],
  bootstrap: [],
})
export class PersonModule {}
