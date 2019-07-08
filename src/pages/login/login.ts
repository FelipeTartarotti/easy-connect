import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController,App} from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { SignUpPage } from '../sign-up/sign-up';
import { TabsPage } from '../tabs/tabs';


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

  private email;
  private password;
  private loader;
  private userId;

  constructor(public navCtrl: NavController, public navParams: 
    NavParams,private userProvider: UsersProvider,private toast: ToastController,
    public loadingCtrl: LoadingController,public appCtrl: App) {
 
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
        this.toast.create({ message: 'Usuário logado com sucesso', duration: 3000 }).present();
        this.userId = result.user._id;
        localStorage.setItem("userId", JSON.stringify(this.userId));
        localStorage.setItem("token", JSON.stringify(result.token));
        localStorage.setItem("logado", JSON.stringify("yes"));
        
       // this.navCtrl.setRoot(TabsPage);
        this.appCtrl.getRootNav().setRoot(TabsPage);
        //this.navCtrl.setRoot(DevicesListPage);
        this.loader.dismiss();
        //this.navCtrl.pop();
        //this.navCtrl.setRoot()
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao efetuar login. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
        this.loader.dismiss();
      });
  }

  ionViewDidLoad() {

  }

  redirect_to_signup(){
    this.navCtrl.push(SignUpPage)
  }

}
