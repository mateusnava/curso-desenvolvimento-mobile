import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListagemPage } from './listagem';

@NgModule({
  declarations: [
    ListagemPage,
  ],
  imports: [
    IonicPageModule.forChild(ListagemPage),
  ],
  exports: [
    ListagemPage
  ]
})
export class ListagemPageModule {}
