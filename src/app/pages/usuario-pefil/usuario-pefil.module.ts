import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioPefilPageRoutingModule } from './usuario-pefil-routing.module';

import { UsuarioPefilPage } from './usuario-pefil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioPefilPageRoutingModule
  ],
  declarations: [UsuarioPefilPage]
})
export class UsuarioPefilPageModule {}
