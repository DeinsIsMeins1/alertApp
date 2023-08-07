import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarNumeroPageRoutingModule } from './agregar-numero-routing.module';

import { AgregarNumeroPage } from './agregar-numero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarNumeroPageRoutingModule
  ],
  declarations: [AgregarNumeroPage]
})
export class AgregarNumeroPageModule {}
