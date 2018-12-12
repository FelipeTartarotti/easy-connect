import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {DeviceConfigPage} from "../device-config/device-config";

@Component({
  selector: 'page-device',
  templateUrl: 'device.html'
})
export class DevicePage {
  devices;
  deviceName;
  deviceId;
  systemState = "Armado";
  img = "../../assets/imgs/house_green.png";
  alarmIsOn = true;
  alarmIsOff = false;
  automation2_name = "empty";
  automation1_name = "empty";
  automation1_time;
  automation2_time;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.deviceName = navParams.get("deviceName");
    this.deviceId = navParams.get("deviceId");
    this.devices = JSON.parse(localStorage.getItem('devices'));

    for(let data of this.devices) {
      if(data.deviceId == this.deviceId){
        this.automation1_name = data.automation1_name;
        this.automation2_name = data.automation2_name;
        this.automation1_time = data.automation1_time;
        this.automation2_time = data.automation2_time;
        console.log(this.automation1_name);
      }
    }
  }

  alarmOn(){
    this.systemState = "Armado";
    this.imgOn();
    this.alarmIsOn = true;
    this.alarmIsOff = false;
  }

  alarmOff(){
    this.systemState = "Desarmado"; 
    this.imgOff();
    this.alarmIsOff = true;
    this.alarmIsOn = false;
  }

  imgOn(){
    this.img = "../../assets/imgs/house_green.png";
  }

  imgOff(){
    this.img = "../../assets/imgs/house_grey.png";
  }

  goToAutomationConfig(){
    this.navCtrl.push(DeviceConfigPage,{deviceName: this.deviceName, deviceId: this.deviceId});
  }
}
