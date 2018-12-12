import {Component } from '@angular/core';
import {NavController } from 'ionic-angular';
import {deviceModel } from '../../model/deviceModel';
import {DevicePage} from '../device/device';
import {AddDevicePage} from '../add-device/add-device';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  devices;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter(){
    this.devices = JSON.parse(localStorage.getItem('devices'));
  }


  selectedDevice(id,name){
    this.navCtrl.push(DevicePage,{deviceName:name, deviceId:id});
  }


  addDevice(){
    this.navCtrl.push(AddDevicePage);
  }

}
