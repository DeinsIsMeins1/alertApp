import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  
  nombre : null | string = '';

  constructor(
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {

    this.nombre = '';

    this.nombre = localStorage.getItem('nombre');
  }

  mostrarMenu() {
    this.menuCtrl.open('first');
  }

}
