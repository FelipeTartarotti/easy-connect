import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import uuidv4  from 'uuid/v1';
import {HomePage} from '../home/home';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import {deviceModel } from '../../model/deviceModel';

/**
 * Generated class for the AddDevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-device',
  templateUrl: 'add-device.html',
})

export class AddDevicePage {

  cloudId;
  device_name;
  devices;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _barcodeScanner: BarcodeScanner) {
    if(localStorage.getItem('devices'))
    {
      this.devices = JSON.parse(localStorage.getItem('devices'));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDevicePage');
  }

  saveDevice(){

    var deviceId = uuidv4();

    if(!localStorage.getItem('devices'))
    {

      var firstDevice: deviceModel[] = [
        {name: this.device_name, cloudId: this.cloudId, deviceId: deviceId, automation1_name: "Automação 1", automation2_name: "Automação 2", automation1_time: "5", automation2_time: "5" }
      ];

      localStorage.setItem("devices", JSON.stringify(firstDevice));
      
    }
    else
    {
      this.devices[this.devices.length] = {name: this.device_name, cloudId: this.cloudId, deviceId: deviceId, automation1_name: "Automação 1", automation2_name: "Automação 2", automation1_time: "5", automation2_time: "5" };
      localStorage.setItem("devices", JSON.stringify(this.devices));
    }

     this.navCtrl.push(HomePage);
  }

  public scanQR() {
    this._barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log("User cancelled the action!");
        return false;
      }
      console.log("Scanned successfully!");
      console.log(barcodeData);
      this.cloudId = barcodeData.text;
    }, (err) => {
      console.log(err);
    });
  }
}


