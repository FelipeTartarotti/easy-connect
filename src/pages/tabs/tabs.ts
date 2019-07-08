import { Component } from '@angular/core';
import { DevicePage } from '../device/device';
import { ConfigPage } from '../config/config';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public tab1Root;
  public tab3Root;

  public showButton;

  constructor() {
    this.showButton = true;
    
    this.tab1Root = HomePage;
    this.tab3Root = ConfigPage;

  }
}
