import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LojaPerfilPageRoutingModule } from './loja-perfil-routing.module';

import { LojaPerfilPage } from './loja-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LojaPerfilPageRoutingModule
  ],
  declarations: [LojaPerfilPage]
})
export class LojaPerfilPageModule {}
