import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { DevicePage } from '../pages/device/device';
import { ConfigPage } from '../pages/config/config';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {AddDevicePage} from "../pages/add-device/add-device";
import {DeviceConfigPage} from "../pages/device-config/device-config";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

@NgModule({
  declarations: [
    MyApp,
    DevicePage,
    ConfigPage,
    HomePage,
    TabsPage,
    DeviceConfigPage,
    AddDevicePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DevicePage,
    ConfigPage,
    HomePage,
    TabsPage,
    DeviceConfigPage,
    AddDevicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
