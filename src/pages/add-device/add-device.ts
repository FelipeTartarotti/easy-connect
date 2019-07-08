import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController,AlertController } from 'ionic-angular';
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

  public cloudId = null;
  public device_name = null;
  public device_password = null;
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
    private devicesProvider : DevicesProvider,
    public alertCtrl: AlertController) {
  
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
    try{

      if(!this.cloudId || !this.device_password  || !this.device_name ){
        throw "Preencha todos os campos para salvar o dispositivo";
      }
    
      if(this.project == null || this.project == false){
        throw "Não foi posível localizar o projeto";
      }

      var newDevice = {title:this.device_name,cloudId:this.cloudId,name_automation1:"Automação 1",name_automation2:"Automação 2",time_automation1:"5",time_automation2:"5", devicePassword:this.device_password};
      this.project.devices.push(newDevice);
      this.updateDevices();

    }catch(erro){
      this.showAlert(erro);
    }
  }

  public scanQR() {
    this._barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        return false;
      }
      this.cloudId = barcodeData.text;
    }, (err) => {
      this.showAlert(err);
    });
  }

  presentLoading(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
    });
    this.loader.present();
  }

  showAlert(text) {
    const alert = this.alertCtrl.create({
      title: 'Ops!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  updateDevices() {
    this.presentLoading("Salvando...");
     this.devicesProvider.updateDevices(this.userId, this.token, this.projectId, this.project)
      .then((result: any) => {
        this.loader.dismiss();
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error: any) => {
        this.loader.dismiss();
        this.showAlert("Ops ocorreu algum erro ao salvar dispositivos - Erro: " + error.error);
      });
  }
}


