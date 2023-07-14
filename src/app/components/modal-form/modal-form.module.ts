import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalFormComponent } from './modal-form.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SvgIconModule } from 'src/app/directives/svg-icon/svg-icon.module';
import {CheckboxModule} from 'primeng/checkbox';
import { PersonModule } from '../person/person.module';

@NgModule({
  declarations: [ModalFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    SvgIconModule,
    CheckboxModule,
    PersonModule,
  ],
  exports: [ModalFormComponent],
  providers: [],
})
export class ModalFormModule {}
