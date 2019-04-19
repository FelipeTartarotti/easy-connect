import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import {DevicePage} from '../device/device';
import { deviceModel } from '../../model/deviceModel';
import {HomePage} from '../home/home';
import { DevicesProvider } from './../../providers/devices/devices';
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
  private loader;
  private project;
  public title;
  public _id: deviceModel;
  public name_automation1 : string;
  public name_automation2 : string;
  public time_automation1 : string;
  public time_automation2 : string;
  public cloudId : string;
  private userId; 
  private token;
  private projectId;
 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private toast: ToastController,
    private devicesProvider : DevicesProvider
    ) {
    this.title = navParams.get("title");
    this._id = navParams.get("_id");    
    this.project = JSON.parse(localStorage.getItem('project'));
    this.userId = JSON.parse(localStorage.getItem('userId'));
    this.token = JSON.parse(localStorage.getItem('token'));
    this.projectId = JSON.parse(localStorage.getItem('projectId'));
  }

  ionViewDidLoad() {

    for(let data of this.project.devices) {
      if(data._id == this._id){
        this.title = data.title;
        this.cloudId = data.cloudId;
        this.name_automation1 = data.name_automation1;
        this.name_automation2 = data.name_automation2;
        this.time_automation1 = data.time_automation1;
        this.time_automation2 = data.time_automation2;
      }
    }

  }

  saveAutomation(){
    var index = 0;
    var data;
    for(data of this.project.devices) {
      if(data._id == this._id){
        this.project.devices[index].title = this.title;
        this.project.devices[index].cloudId = this.cloudId;
        this.project.devices[index].name_automation1 = this.name_automation1;
        this.project.devices[index].name_automation2 = this.name_automation2;
        this.project.devices[index].time_automation1 = this.time_automation1;
        this.project.devices[index].time_automation2 = this.time_automation2;
      }
      index++;
    }
    
    localStorage.setItem("project", JSON.stringify(this.project));
    this.upadateDevices();
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Atualizando...",
    });
    this.loader.present();
  }
  async upadateDevices() {
    this.presentLoading();
    await this.devicesProvider.updateDevices(this.userId, this.token, this.projectId, this.project)
      .then((result: any) => {
        console.log(result);
        this.loader.dismiss();
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro salvar dispositivos. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
        this.loader.dismiss();
      });
    this.navCtrl.setRoot(HomePage);
  }
}
