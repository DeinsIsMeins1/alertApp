import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontawesomeModule } from '../modules/fontawesome.module';



@NgModule({
  declarations: [
    HeaderComponent
    //
  ],
  exports: [
    HeaderComponent
    //
  ],
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
    FontawesomeModule,
  ]
})
export class ComponentsModule { }
