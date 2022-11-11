import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './crud/create/create.component';
import { ListComponent } from './crud/list/list.component';
import { EditComponent } from './crud/edit/edit.component';



const routes: Routes = [
  {
    path:'',
    redirectTo: 'products/list',
    pathMatch: 'full'
  },
  {
    path: 'products/create',
    component: CreateComponent,
  },
  {
    path: 'products/list',
    component: ListComponent,
  },
  {
    path: 'products/edit/:id',
    component: EditComponent
  }
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }


