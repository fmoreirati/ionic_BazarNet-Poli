import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LojaPerfilPage } from './loja-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: LojaPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LojaPerfilPageRoutingModule {}
