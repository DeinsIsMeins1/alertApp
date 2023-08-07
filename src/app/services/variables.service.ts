import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, timeout, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  public appConfig = {
    flagProduccion: false,                                         // Bandera para indica si está en producción o en QA
    url: 'https://ahumada.bsite.net/api/Users/',  // URL de API PROD

    versionIos: '1.0.0',                                  // Versión de iOS en APP
    versionAndroid: '1.0.0',                                  // Versión de Android en APP
    buildIos: '202308061806',                           // Versión del Build de iOS en APP
    buildAndroid: '202308061806',                           // Versión del Build de Android en APP
    tiempoIntervalo: 600000,                                    //Tiempo para los intervalos de recarga en permisos

    loginProd: false,                                     // true: El login busca la info en producción. false: Usa la base de QA
    tiempoConexion: 60000,                                    // Tiempo para los timeOut de los servicios (ms)
  };

  public rutasImagenes = {
    logo: 'assets/logos/logo.png',            // Logo principal de la empresa en pequeño
    logoCompleto: 'assets/logos/LogoCompleto.png',    // Logo principal de la empresa en grande
  };

  constructor(
    private toastController: ToastController,
    public http: HttpClient,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
  ) { }

  /** HEADERS
  * 
  * @returns 
  */
  public getHttpHeaders() {
    return new HttpHeaders({
      'content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json'
    });


  }



  //Apis//

  ///////CLIENT/////////

  /**
   * 
   * @param dataToSend 
   * @returns 
   */
  login(dataToSend: any) {
    const endPoint = 'login?';

    return this.http.get(this.appConfig.url + endPoint + dataToSend, { headers: this.getHttpHeaders() }).pipe(
      timeout(this.appConfig.tiempoConexion),
      catchError((err) => {

        this.errorServer(err.error);

        throw err;
      })
    );
  }

    /**
   * 
   * @param dataToSend 
   * @returns 
   */
    register(dataToSend: any) {
      const endPoint = 'Register?';
    
      const url = this.appConfig.url + endPoint + dataToSend;
      const headers = this.getHttpHeaders();
    
      return this.http.post(url, null, { headers: headers, responseType: 'text' }).pipe(
        timeout(this.appConfig.tiempoConexion),
        catchError((error: any) => {
          this.errorServer(error);
    
          throw error;
        })
      );
    }



  /**
   * 
   * @param msg 
   */
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  /**
   * 
   * @param error 
   */
  async errorServer(error: any) {

    this.hideLoader('');

    this.error('ERROR DE SERVICIO::::', error);

    let headerTxt = '';
    let texto = '';


    texto = error;


    //.................................
    // ALERTA
    //.................................

    this.showAlert({
      // header: headerTxt,
      subHeader: texto,
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {

        }
      }],
    });

  }

  /**
   * 
   * @param args 
   */
  public log(...args: any[]): void {
    if (!this.appConfig.flagProduccion) {
      // en produccion se deshabitan logs
      console.log(...args);
    }
  }

  /** Metodo mostrar alerta
   * 
   * @param properties 
   * @param timer 
   */
  async showAlert(properties: any, timer?: number) {

    if (typeof timer === 'undefined') {
      timer = 700;
    }

    // Agrego la propiedad para que no se cierre la ventana
    if (typeof properties.backdropDismiss === 'undefined') {
      properties.backdropDismiss = false;
    }

    setTimeout(async () => {
      const alert = await this.alertController.create(properties);
      alert.present();
    }, timer);
  }

  /**
   * 
   * @param texto 
   */
  public showLoader(texto: any) {
    // this.log('Abriendo Spiner..........', texto);
    this.loadingCtrl.create({
      message: texto,
    }).then((res) => {
      res.present();
    });
  }

  /**
   * 
   * @param goTo 
   * @param timer 
   */
  public hideLoader(goTo?: string, timer?: number) {

    if (typeof timer === 'undefined') {
      timer = 700;
    }

    // this.log('Ocultando Spiner..........', goTo, timer);

    setTimeout(() => {
      this.loadingCtrl.dismiss().then((response: any) => {
        // this.log('RESPUESTA de hideLoader: ', response);

        if (typeof goTo !== 'undefined' && goTo !== '') {
          window.location.href = goTo;
        }

      }).catch((err) => {
        // this.log('ERROR en hideLoader: ', err);
      });
    }, timer);
  }

  /**
   * 
   * @param args 
   */
  public error(...args: any[]): void {
    if (!this.appConfig.flagProduccion) {
      // en produccion se deshabitan logs
      console.error(...args);
    }
  }


}
