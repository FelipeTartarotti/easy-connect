import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController} from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import {DevicesListPage} from '../devices-list/devices-list';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email;
  password;
  loader;

  constructor(public navCtrl: NavController, public navParams: 
    NavParams,private userProvider: UsersProvider,private toast: ToastController,
    public loadingCtrl: LoadingController) {
 
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Fazendo Login...",
    });
    this.loader.present();
  }

  login() {
    this.presentLoading();
    this.userProvider.login(this.email, this.password)
      .then((result: any) => {
        console.log(result);
        this.toast.create({ message: 'Usuário logado com sucesso', duration: 3000 }).present();

        var phoneId = result.user._id;
        localStorage.setItem("phoneId", JSON.stringify(phoneId));
        localStorage.setItem("token", JSON.stringify(result.token));
        localStorage.setItem("logado", JSON.stringify("yes"));

        this.navCtrl.push(DevicesListPage);
        
        //this.navCtrl.pop();
        //this.navCtrl.setRoot()
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao efetuar login. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
      });

      this.loader.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
