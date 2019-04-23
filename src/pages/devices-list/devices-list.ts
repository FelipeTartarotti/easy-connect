import {Component } from '@angular/core';
import {NavController,ToastController,LoadingController } from 'ionic-angular';
import {deviceModel } from '../../model/deviceModel';
import {DevicePage} from '../device/device';
import {LoginPage} from '../login/login';
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
    localStorage.removeItem("project");
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

        console.log(result.project);
        //localStorage.setItem("projectId", JSON.stringify(this.devices[0].project));
        localStorage.setItem("projectId", JSON.stringify(result.project._id));
        localStorage.setItem("project", JSON.stringify(result.project));
        this.devices = result.project.devices;
        this.loader.dismiss();
      })
      .catch((error: any) => {
        if(error.error == undefined){
          console.log("nada encontrado");
          
        }

        if(error.error == "Invalid Token"){
          console.log("Token Inválido");
          this.navCtrl.setRoot(LoginPage);
        }

       // this.toast.create({ message: 'Nenhum. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
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
