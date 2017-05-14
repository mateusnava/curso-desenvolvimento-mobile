import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
  selector: 'page-listagem',
  templateUrl: 'listagem.html',
})
export class ListagemPage {
  private registers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: Http, private loadingController: LoadingController) {
  }

  ionViewDidEnter() {
    let loading = this.loadingController.create();
    loading.present();
    let promise = this.http.get('https://curso-mobile.herokuapp.com/registers').toPromise();
    promise.then((result) => {
      this.registers = result.json();
      loading.dismiss();
    }).catch((error) => {
      loading.dismiss();
      console.error(error);
      alert('Falha ao cartegar os dados.');
    });

    return new Promise((resolve, reject) => {
      promise.then(resolve, reject);
    });
  }

  doRefresh(refresher) {
    this.ionViewDidEnter().then(() => {
      refresher.complete();
    }).catch(() => {
      refresher.complete();
    })
  }

}
