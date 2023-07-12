import { NgModule } from '@angular/core';

import { ErrorPageComponent } from './error-page.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    component: ErrorPageComponent
  }
]

@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  providers: [],
  bootstrap: []
})
export class ErrorPageModule { }
