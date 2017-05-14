import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
  private registro;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private http: Http, private loadingController: LoadingController,
      private camera: Camera, private geolocation: Geolocation) {
    this.registro = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }

  isValid() {
      return this.registro.nome && this.registro.telefone && this.registro.tipo && this.registro.caracteristicas;
  }

  registrar() {
    let url = 'https://curso-mobile.herokuapp.com/registers';

    if (!this.isValid()) {
      alert('Dados inválidos');
      return;
    }

    let loader = this.loadingController.create({
      content: 'Aguarde...',
    });
    loader.present(); // Exibe Loader

    let optionsGps = {
      enableHighAccuracy: true,
      maximumAge: 0
    };
    this.geolocation.getCurrentPosition(optionsGps).then((resp) => {
      let objetoEnvio = {
      	register: {
      		nome: this.registro.nome,
      		telefone: this.registro.telefone,
      		tipo: this.registro.tipo,
      		caracteristicas: this.registro.caracteristicas,
          foto: this.registro.foto,
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude
      	}
      };

      this.http.post(url, objetoEnvio).toPromise().then((result) => {
        this.registro = {};
        loader.dismiss();
        alert('Ocorrência salva com sucesso!');
      }).catch((error) => {
        alert('Falha ao enviar os dados');
        console.error('Falha ao gravar registro', error);
        loader.dismiss();
      });

      console.log(this.registro);
    }).catch((error) => {
      alert('Falha ao obter posição GPS');
      loader.dismiss();
      console.error(error);
    })
  }

  foto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }


    this.camera.getPicture(options).then((imageData) => {
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.registro.foto = base64Image;
    }, (err) => {
      alert('Falha ao obter foto.');
    });
  }

}
