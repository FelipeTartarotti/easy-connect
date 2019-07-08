import { Component } from '@angular/core';
import { NavController,App } from 'ionic-angular';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

  userId : string;
  private logado;

  constructor(public navCtrl: NavController,public appCtrl: App) {
    this.userId = JSON.parse(localStorage.getItem('userId'));
  }

  ionViewWillEnter(){
   
    this.logado = JSON.parse(localStorage.getItem('logado'));
    
    if(this.logado!="yes"){ 
      this.navCtrl.setRoot(LoginPage);
    }
    
  }

  logout(){
    localStorage.removeItem("project");
    localStorage.setItem("logado", JSON.stringify("no"));
    localStorage.removeItem("projectId");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    this.appCtrl.getRootNav().setRoot(LoginPage);
  }
}
