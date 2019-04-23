import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

  phoneId : string;

  constructor(public navCtrl: NavController) {

    this.phoneId = JSON.parse(localStorage.getItem('phoneId'));
    
  }

  logout(){
    localStorage.removeItem("project");
    localStorage.removeItem("logado");
    localStorage.removeItem("projectId");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    this.navCtrl.setRoot(LoginPage);

  }
}
