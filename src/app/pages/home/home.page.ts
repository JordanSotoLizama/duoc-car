import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { $ } from 'protractor';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  data: any;

  constructor(private activeroute: ActivatedRoute, private router:Router, private alertController: AlertController) {
    this.activeroute.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.data = this.router.getCurrentNavigation().extras.state.user;
      }
      else{
        this.router.navigate(["/login"])
      }
    });
   }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Datos:',
      message: 'usuario: '+ this.data.usuario,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
