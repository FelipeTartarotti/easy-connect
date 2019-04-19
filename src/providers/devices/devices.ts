import { Injectable } from '@angular/core';
import { Http,Headers ,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DevicesProvider {
  
  private API_URL = 'https://cors-anywhere.herokuapp.com/https://whispering-chamber-39173.herokuapp.com'

  constructor(public http: Http) {
    console.log('Hello UsersProvider Provider');
  }

  loadDevices(userId: string,token: string) {

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + '/projects/'+userId, options)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }  

  updateDevices(userId: string,token: string, projectId: string, devices :object) {

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    let options = new RequestOptions({ headers: headers });

    console.log("provider ->",devices);
    return new Promise((resolve, reject) => {
      this.http.put(this.API_URL + '/projects/'+projectId+"/"+userId,devices,options)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }  
}