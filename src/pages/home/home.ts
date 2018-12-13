import {Component } from '@angular/core';
import {NavController } from 'ionic-angular';
import {deviceModel } from '../../model/deviceModel';
import {DevicePage} from '../device/device';
import {AddDevicePage} from '../add-device/add-device';
import uuidv4  from 'uuid/v1';


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
    if(!localStorage.getItem('phoneId'))
    {
      var phoneId = uuidv4();
      phoneId = phoneId.substring(0,18);
      localStorage.setItem("phoneId", JSON.stringify(phoneId));
    }
  }


  selectedDevice(id,name){
    this.navCtrl.push(DevicePage,{deviceName:name, deviceId:id});
  }


  addDevice(){
    this.navCtrl.push(AddDevicePage);
  }

}
