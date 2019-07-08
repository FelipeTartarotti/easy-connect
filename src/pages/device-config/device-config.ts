import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController,AlertController} from 'ionic-angular';
import {DevicePage} from '../device/device';
import { deviceModel } from '../../model/deviceModel';
import {HomePage} from '../home/home';
import { DevicesProvider } from './../../providers/devices/devices';
import { applySourceSpanToStatementIfNeeded } from '@angular/compiler/src/output/output_ast';
import { getOrCreateInjectable } from '@angular/core/src/render3/di';
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
  public _id: string;
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
    private devicesProvider : DevicesProvider,
    public alertCtrl: AlertController
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
    this.updateDevices();
  }

  presentLoading(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
    });
    this.loader.present();
  }

  async updateDevices() {
    this.presentLoading("Atualizando");
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

  deleteDevice(){
    this.presentLoading("Excluindo dispositivo");
    const deleteFromDeviceTable = new Promise((resolve, reject) => { 
      this.devicesProvider.deleteDevice(this.userId,this._id, this.token)
      .then((result: any) => {
        resolve(result);
      })
      .catch((error: any) => {
        reject(error);
      });
    });
  
    const deleteFromProjectTable = new Promise((resolve, reject) => {
      this.devicesProvider.deleteDeviceFromProject(this.userId,this._id, this.token,this.projectId)
      .then((result: any) => {
        resolve(result);
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao excluir dispositivo. Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
        reject(error);
      }); 
    });

    Promise.all([
      deleteFromDeviceTable,
      deleteFromProjectTable]).then(values => { 
      this.loader.dismiss();
      this.toast.create({ message: 'Dispositivo deletado com sucesso', position: 'botton', duration: 3000 }).present();
      this.navCtrl.setRoot(HomePage);
    }).catch(reason=>{
      this.loader.dismiss();
      this.toast.create({ message: 'Erro ao excluir dispositivo. Erro: ' + reason, position: 'botton', duration: 3000 }).present();
    });  
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Exclusão de dispositivo',
      message: 'Você realmente deseja excluir esse dispositivo?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.deleteDevice();
          }
        }
      ]
    });
    confirm.present();
  }
}


