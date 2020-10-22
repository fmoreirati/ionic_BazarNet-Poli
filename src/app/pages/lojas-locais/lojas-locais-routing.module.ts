import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LojasLocaisPage } from './lojas-locais.page';

const routes: Routes = [
  {
    path: '',
    component: LojasLocaisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LojasLocaisPageRoutingModule {}
