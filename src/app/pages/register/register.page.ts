import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  
  email: string = '';
  pass: string = '';
  name: string = '';
  dataFromService: any;


  constructor(
    public variables: VariablesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    //Valido que no esté vacio los campos
    if (this.email === '' || this.pass === '' || this.name === '') {
      this.variables.presentToast('Falta información');
      return;
    }

    //Hacemos un encodeURI para poder recibir simbolos diferentes dentro de la contraseña
    this.pass = encodeURIComponent(this.pass);

    //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
    const datosPersonales = "name=" + this.name + "&email=" + this.email + "&password=" + this.pass;

    this.variables.showLoader('Registrando...');



    this.variables.register(datosPersonales).subscribe(
      async (dataReturnFromService: any) => {

        //Obtenemos la respuesta del API en dataReturnFromService
        //Guardamos la variable del api dentro de this.dataFromService
        this.dataFromService = (dataReturnFromService);

        this.variables.presentToast(this.dataFromService);

        this.router.navigate(['/login']);

        this.variables.hideLoader();

      },
    );
  }


}
