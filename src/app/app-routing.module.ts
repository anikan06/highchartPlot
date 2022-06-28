import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDataComponent } from './form-data/form-data.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'data',
    pathMatch: 'full'
  },
  {
    path: 'data',
    component: FormDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
