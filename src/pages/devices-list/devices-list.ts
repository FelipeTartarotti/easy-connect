import {Component } from '@angular/core';
import {NavController,ToastController,LoadingController } from 'ionic-angular';
import {deviceModel } from '../../model/deviceModel';
import {DevicePage} from '../device/device';
import {AddDevicePage} from '../add-device/add-device';
import uuidv4  from 'uuid/v1';
import { DevicesProvider } from './../../providers/devices/devices';

@Component({
  selector: 'page-devices-list',
  templateUrl: 'devices-list.html',
})
export class DevicesListPage {

 
  private loader;
  private userId;
  private token;
  public devices;


  constructor(public navCtrl: NavController, 
    private devicesProvider: DevicesProvider,
    private toast: ToastController,
    public loadingCtrl: LoadingController) {
    this.userId = JSON.parse(localStorage.getItem('userId'));
    this.token = JSON.parse(localStorage.getItem('token'));
    this.loadDevices();
  }

  ionViewDidEnter(){
   
  }


  selectedDevice(_id,title){
    this.navCtrl.push(DevicePage,{title:title, _id:_id});
  }


  addDevice(){
    this.navCtrl.push(AddDevicePage);
  }

  async loadDevices() {
    this.presentLoading();

    await this.devicesProvider.loadDevices(this.userId, this.token )
      .then((result: any) => {

        this.devices = result.project.devices;

        localStorage.setItem("projectId", JSON.stringify(this.devices[0].project));
        localStorage.setItem("project", JSON.stringify(result.project));
        
        this.loader.dismiss();
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao carregar dispositivos. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
        this.loader.dismiss();
      });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando dispositivos",
    });
    this.loader.present();
  }
  
}
