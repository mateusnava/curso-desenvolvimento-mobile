import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
  private registro;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      private http: Http, private loadingController: LoadingController,
      private camera: Camera) {
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

    let objetoEnvio = {
    	register: {
    		nome: this.registro.nome,
    		telefone: this.registro.telefone,
    		tipo: this.registro.tipo,
    		caracteristicas: this.registro.caracteristicas
    	}
    };

    this.http.post(url, objetoEnvio).toPromise().then((result) => {
      console.log(result);
      this.registro = {};
      loader.dismiss();
      alert('Ocorrência salva com sucesso!');
    }).catch((error) => {
      alert('Falha ao enviar os dados');
      console.error('Falha ao gravar registro', error);
      loader.dismiss();
    });

    console.log(this.registro);
    console.log('Clicou em Registrar');
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
