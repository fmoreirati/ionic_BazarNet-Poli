import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioPefilPage } from './usuario-pefil.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioPefilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioPefilPageRoutingModule {}
