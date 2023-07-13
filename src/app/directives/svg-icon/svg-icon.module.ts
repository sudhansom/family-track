import { CommonModule } from '@angular/common';
import {
  HttpClientModule
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SvgIconDirective } from './svg-icon.directive';

@NgModule({
  declarations: [
    SvgIconDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports:[SvgIconDirective],
  providers: [],
  bootstrap: [],
})
export class SvgIconModule {}
