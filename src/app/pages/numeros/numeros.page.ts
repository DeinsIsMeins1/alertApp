import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesService } from 'src/app/services/variables.service';

import { Share } from '@capacitor/share';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-numeros',
  templateUrl: './numeros.page.html',
  styleUrls: ['./numeros.page.scss'],
})
export class NumerosPage implements OnInit {

  dataFromService: any;

  constructor(
    public variables: VariablesService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.obtenerNumeros();
  }

  obtenerNumeros() {

    const id = localStorage.getItem('id');

    //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
    const datosPersonales = "id_user=" + id;


    this.variables.obtenerNumeros(datosPersonales).subscribe(
      async (dataReturnFromService: any) => {

        //Obtenemos la respuesta del API en dataReturnFromService
        //Guardamos la variable del api dentro de this.dataFromService
        this.dataFromService = (dataReturnFromService);
        console.log('--------------Respuesta', this.dataFromService);

      },
    );
  }

  async obtenerUbicacionActual(number: number) {
    try {
      const position = await Geolocation['getCurrentPosition']();
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // this.variables.presentToast('Latitud: '+lat+'y longitud: '+lng);

      this.abrirGoogleMaps(lat,lng,number);
      
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
      this.variables.presentToast('Error al obtener la ubicación'+error);
    }
  }

  async abrirGoogleMaps(lat: number, lng: number, number: number) {

    // const phoneNumber = '7831369023';
    const message = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    const encodedMessage = encodeURIComponent(message);

    window.location.href = `https://api.whatsapp.com/send?phone=${number}&text=${encodedMessage}`;


  }

  agregar(){
    this.router.navigate(['/agregar-numero']);
  }

  agregarFavorito(number: number){



    const datosPersonales = "id_number=" + number;

    this.variables.actualizarPrioridadNumero(datosPersonales).subscribe(
      async (dataReturnFromService: any) => {

        //Obtenemos la respuesta del API en dataReturnFromService
        //Guardamos la variable del api dentro de this.dataFromService
        this.dataFromService = (dataReturnFromService);
        this.obtenerNumeros();
      },
    );
  }

  borrarNumero(id: number){
    console.log('Borrar',id);
    

    //Guardamos el usuario y la contraseña en una variable para mandarla a LoginEmpleado en proveedor
    const datosPersonales = "id_number=" + id;


    console.log(datosPersonales);
    
    // this.variables.showLoader('Registrando...');

    this.variables.eliminarNumero(datosPersonales).subscribe(
      async (dataReturnFromService: any) => {

        //Obtenemos la respuesta del API en dataReturnFromService
        //Guardamos la variable del api dentro de this.dataFromService
        this.dataFromService = (dataReturnFromService);

        this.variables.presentToast('Numero borrado correctamente');

        this.obtenerNumeros()

        // this.router.navigate(['/numeros']);

        // this.variables.hideLoader();

      },
    );
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      this.obtenerNumeros();
    }, 1000);



  }

  

}
