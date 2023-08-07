import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faCircleUser, faMobile } from '@fortawesome/free-solid-svg-icons';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports:[
    FontAwesomeModule
  ]
})
export class FontawesomeModule {
  constructor(library: FaIconLibrary) {
    // Agrega los íconos que deseas utilizar aquí
    library.addIcons( 
      faCircleUser,
      faBars,
      faMobile
      );
  }
}