import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LojasLocaisPageRoutingModule } from './lojas-locais-routing.module';

import { LojasLocaisPage } from './lojas-locais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LojasLocaisPageRoutingModule
  ],
  declarations: [LojasLocaisPage]
})
export class LojasLocaisPageModule {}
