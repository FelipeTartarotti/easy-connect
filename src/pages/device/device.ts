import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {DeviceConfigPage} from "../device-config/device-config";

@Component({
  selector: 'page-device',
  templateUrl: 'device.html'
})
export class DevicePage {
  private project;
  title;
  _id;
  systemState = "Armado";
  img = "../../assets/imgs/house_green.png";
  alarmIsOn = true;
  alarmIsOff = false;
  name_automation2 = "empty";
  name_automation1 = "empty";
  time_automation1;
  time_automation2;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
        
    this.title = navParams.get("title");
    this._id = navParams.get("_id");

    console.log(this.title,this._id);
    this.project = JSON.parse(localStorage.getItem('project'));

    for(let data of this.project.devices) {
      if(data._id == this._id){
        this.name_automation1 = data.name_automation1;
        this.name_automation2 = data.name_automation2;
        this.time_automation1 = data.time_automation1;
        this.time_automation2 = data.time_automation2;
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
    this.navCtrl.push(DeviceConfigPage,{title: this.title, _id: this._id});
  }
}
