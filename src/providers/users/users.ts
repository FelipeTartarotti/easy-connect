import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

  private API_URL = 'https://cors-anywhere.herokuapp.com/https://whispering-chamber-39173.herokuapp.com'

  constructor(public http: Http) {
    console.log('Hello UsersProvider Provider');
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        password: password
      };
 
      this.http.post(this.API_URL + '/auth/authenticate', data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  sing_up(name: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      var data = {
        'name': name,
        'email': email,
        'password': password
      };
      this.http.post(this.API_URL + '/auth/register', data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
      });
    });
  }
}
