import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceConfigPage } from './device-config';

@NgModule({
  declarations: [
    DeviceConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceConfigPage),
  ],
})
export class DeviceConfigPageModule {}
