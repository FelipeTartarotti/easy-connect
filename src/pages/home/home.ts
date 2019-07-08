import {Component } from '@angular/core';
import {NavController } from 'ionic-angular';
import {deviceModel } from '../../model/deviceModel';
import {DevicePage} from '../device/device';
import {AddDevicePage} from '../add-device/add-device';
import {LoginPage} from '../login/login';
import uuidv4  from 'uuid/v1';
import {DevicesListPage} from '../devices-list/devices-list';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  logado;

  constructor(public navCtrl: NavController) {

    

  }

  ionViewWillEnter(){
   
    this.logado = JSON.parse(localStorage.getItem('logado'));
    
    if(this.logado=="yes"){
      this.navCtrl.setRoot(DevicesListPage);
    }
    else
    {
      this.navCtrl.setRoot(LoginPage);
    }
    
  }
}
