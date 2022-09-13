import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { AlertController, AnimationController, LoadingController, Animation } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  data: any;

  constructor(private activeroute: ActivatedRoute,
              private router:Router, private alertController: AlertController,
              private loadingCtrl: LoadingController) {
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
      this.presentLoading();
      const alert = await this.alertController.create({
      header: 'Datos:',
      message: 'usuario: '+ this.data.usuario,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      message: 'cargando',
      duration: 2000
    });
    return await loading.present();
  }
}

