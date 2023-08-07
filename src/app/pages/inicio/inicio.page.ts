import { Component, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { Plugins } from '@capacitor/core';
import { VariablesService } from 'src/app/services/variables.service';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    public variables: VariablesService
  ) { }

  ngOnInit() {
  }

  // async sendWhatsAppMessage() {

  //   const apiURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

  //   try {
  //     await Share.share({
  //       title: 'Compartir en WhatsApp',
  //       text: message,
  //       url: apiURL,
  //     });
  //     console.log('Mensaje compartido con éxito');
  //   } catch (error) {
  //     console.error('Error al compartir el mensaje', error);
  //   }
  // }

  async obtenerUbicacionActual() {
    try {
      const position = await Geolocation['getCurrentPosition']();
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      this.variables.presentToast('Latitud: '+lat+'y longitud: '+lng);

      this.abrirGoogleMaps(lat,lng);
      
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
      this.variables.presentToast('Error al obtener la ubicación'+error);
    }
  }

  async abrirGoogleMaps(lat: number, lng: number) {

    const phoneNumber = '7831369023';
    const message = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    const encodedMessage = encodeURIComponent(message);

    window.location.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;


  }
  

}
