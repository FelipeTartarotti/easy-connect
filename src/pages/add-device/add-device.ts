import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import uuidv4  from 'uuid/v1';
import {HomePage} from '../home/home';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import {deviceModel } from '../../model/deviceModel';
import { DevicesProvider } from './../../providers/devices/devices';
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

  public cloudId;
  public device_name;
  public device_password;
  private project;
  private loader;
  private userId;
  private token;
  private projectId;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private _barcodeScanner: BarcodeScanner,
    public loadingCtrl: LoadingController,
    private toast: ToastController,
    private devicesProvider : DevicesProvider) {
    if(localStorage.getItem('project'))
    {
      this.project = JSON.parse(localStorage.getItem('project'));
    }
    
    this.userId = JSON.parse(localStorage.getItem('userId'));
    this.token = JSON.parse(localStorage.getItem('token'));
    this.projectId = JSON.parse(localStorage.getItem('projectId'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDevicePage');
  }

  saveDevice(){
    var newDevice = {title:this.device_name,cloudId:this.cloudId,name_automation1:"Automação 1",name_automation2:"Automação 2",time_automation1:"5",time_automation2:"5", devicePassword:this.device_password};
    this.project.devices.push(newDevice);
    this.updateDevices();
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

  presentLoading(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
    });
    this.loader.present();
  }

  async updateDevices() {
    this.presentLoading("Salvando...");
    this.devicesProvider.updateDevices(this.userId, this.token, this.projectId, this.project)
      .then((result: any) => {
        console.log(result);
        this.loader.dismiss();
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro salvar dispositivos. Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
        this.loader.dismiss();
      });
    this.navCtrl.setRoot(HomePage);
  }
}


