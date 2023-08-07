import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  pass: string = '';
  dataFromService: any;

  constructor(
    public variables: VariablesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    //Valido que no esté vacio los campos
    if (this.email === '' || this.pass === '') {
      this.variables.presentToast('Falta información');
      return;
    }

    //Hacemos un encodeURI para poder recibir simbolos diferentes dentro de la contraseña
    this.pass = encodeURIComponent(this.pass);

    //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
    const datosPersonales = "email=" + this.email + "&password=" + this.pass;

    this.variables.showLoader('Conectando...');



    this.variables.login(datosPersonales).subscribe(
      async (dataReturnFromService: any) => {

        //Obtenemos la respuesta del API en dataReturnFromService
        //Guardamos la variable del api dentro de this.dataFromService
        this.dataFromService = (dataReturnFromService);
        console.log('--------------Respuesta', this.dataFromService);

        this.router.navigate(['/inicio']);

        this.variables.hideLoader('');






      },
    );
  }

  registro(){
    this.router.navigate(['/register']);
  }

}
