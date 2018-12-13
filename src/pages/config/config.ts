import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

  phoneId : string;

  constructor(public navCtrl: NavController) {

    this.phoneId = JSON.parse(localStorage.getItem('phoneId'));
    
  }
}
