import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Persistencia de dados nativa do ionic/angular
import { IonicStorageModule } from '@ionic/storage-angular';

import { FormBuilder } from '@angular/forms';
import { DatabaseService } from './services/database.service';

import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule, IonicStorageModule.forRoot()],
  providers: [ FormBuilder, DatabaseService, DatePipe, DatePicker, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
