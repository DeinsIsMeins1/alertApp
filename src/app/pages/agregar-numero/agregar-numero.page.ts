import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-agregar-numero',
  templateUrl: './agregar-numero.page.html',
  styleUrls: ['./agregar-numero.page.scss'],
})
export class AgregarNumeroPage implements OnInit {

  number: string = '';
  prioridad: number = 0;

  dataFromService: any;


  constructor(
    public variables: VariablesService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {

    const valorPrioridad = this.prioridad ? '1' : '0';
    
    console.log('Valor de prioridad:', valorPrioridad);
    
    //Valido que no esté vacio los campos
    if (this.number === '') {
      this.variables.presentToast('Falta información');
      return;
    }

    const id = localStorage.getItem('id');


    //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
    const datosPersonales = "id_user=" + id + "&number=" + this.number + "&prioridad=" + valorPrioridad;


    console.log(datosPersonales);
    
    this.variables.showLoader('Registrando...');

    this.variables.registrarNumero(datosPersonales).subscribe(
      async (dataReturnFromService: any) => {

        //Obtenemos la respuesta del API en dataReturnFromService
        //Guardamos la variable del api dentro de this.dataFromService
        this.dataFromService = (dataReturnFromService);

        this.variables.presentToast('Numero registraro correctamente');

        this.number = '';

        this.router.navigate(['/numeros']);

        this.variables.hideLoader();

      },
    );
  }


}
