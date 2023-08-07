import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarNumeroPage } from './agregar-numero.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarNumeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarNumeroPageRoutingModule {}
