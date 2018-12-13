import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DevicePage} from '../device/device';
import { deviceModel } from '../../model/deviceModel';
import {HomePage} from '../home/home';
/**
 * Generated class for the AutomationConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * 
 *  localStorage.getItem('ExplanationPage');
    localStorage.setItem('BotWhatIsYourJob', '1');
 */

@IonicPage()
@Component({
  selector: 'page-device-config',
  templateUrl: 'device-config.html',
})
export class DeviceConfigPage {

  devices;
  deviceName;
  deviceId: deviceModel;
  automation1_name : string;
  automation2_name : string;
  automation1_time : string;
  automation2_time : string;
  name : string;
  cloudId : string;
 

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.deviceName = navParams.get("deviceName");
    this.deviceId = navParams.get("deviceId");    
    this.devices = JSON.parse(localStorage.getItem('devices'));
  }

  ionViewDidLoad() {

    for(let data of this.devices) {
      if(data.deviceId == this.deviceId){
        this.name = data.name;
        this.cloudId = data.cloudId;
        this.automation1_name = data.automation1_name;
        this.automation2_name = data.automation2_name;
        this.automation1_time = data.automation1_time;
        this.automation2_time = data.automation2_time;
      }
    }
  }

  saveAutomation(){
    var index = 0;
    var data;
    for(data of this.devices) {
      
      if(data.deviceId == this.deviceId){
        this.devices[index].name = this.name;
        this.devices[index].cloudId = this.cloudId;
        this.devices[index].automation1_name = this.automation1_name;
        this.devices[index].automation2_name = this.automation2_name;
        this.devices[index].automation1_time = this.automation1_time;
        this.devices[index].automation2_time = this.automation2_time;
      }

      index++;
    }
  
    localStorage.setItem("devices", JSON.stringify(this.devices));
    this.navCtrl.setRoot(HomePage);
  }
}
