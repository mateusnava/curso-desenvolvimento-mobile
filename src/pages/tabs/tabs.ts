import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { RegistrarPage } from '../registrar/registrar';
import { MapaPage } from '../mapa/mapa';
import { ListagemPage } from '../listagem/listagem';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RegistrarPage;
  tab2Root = ListagemPage;
  tab3Root = MapaPage;

  constructor() {

  }
}
