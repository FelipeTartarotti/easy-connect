import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { User } from '../../model/user';
import { UsersProvider } from '../../providers/users/users';
import { LoginPage } from '../login/login';
import { DevicesProvider } from '../../providers/devices/devices';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  public user = new User(); 
  public password_confirm;
  public email_confirm;
  private loader;


  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private toast: ToastController, private userProvider: UsersProvider,
              public loadingCtrl: LoadingController, private devices_provider : DevicesProvider) {
  }

  ionViewDidLoad() {
 
  }
  presentLoading(text) {
    this.loader = this.loadingCtrl.create({
      content: text,
    });
    this.loader.present();
  }

  sign_up(){

    if(this.user.password != this.password_confirm){
      this.toast.create({ message: 'Senhas são diferentes', duration: 3000 }).present();
    }
    else if (this.user.email != this.email_confirm ) 
    {
      this.toast.create({ message: 'Emails são diferentes', duration: 3000 }).present(); 
    }
    else{

      this.presentLoading("Criando conta...");
      this.userProvider.sing_up(this.user.name,this.user.email,this.user.password)
        .then((result: any) => {
          this.loader.dismiss();
          this.create_project(result._id)
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao efetuar login. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
        this.loader.dismiss();
      });
      
    }
  }

  create_project(user_id){
  
    this.presentLoading("Preparando conta...");
    this.devices_provider.create_project(user_id)
        .then((result: any) => {
          this.loader.dismiss();
          this.toast.create({ message: 'Usuário criado com sucesso', duration: 3000 }).present();    
          this.navCtrl.setRoot(LoginPage);  
      })
      .catch((error: any) => {
        this.loader.dismiss();
        this.toast.create({ message: 'Erro ao criar projeto. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
        
    });
  }
}
