import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { enterAnimation } from './animations/nav-animation';

import { SQLite } from '@ionic-native/sqlite/ngx';

import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot({
    navAnimation: enterAnimation //animación por ruta
  }),
  AppRoutingModule],
  providers: [Storage, IonicStorageModule,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite],
  bootstrap: [AppComponent],
})
export class AppModule {}
