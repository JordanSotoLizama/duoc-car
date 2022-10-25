import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { AlertController, ToastController } from '@ionic/angular';
import { DbAuthenticationService } from '../../services/db-authentication.service';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login:any={
    usuario:"",
    password:""
  }

  field:string="";

  constructor(private router: Router, private dbService: DbService, public alertController: AlertController, public toastController: ToastController,
              private storage: Storage, public dbAuthenticationService: DbAuthenticationService) { }

  ngOnInit() {}

  
  ingresar(){
    if(this.validateModel(this.login)){
      this.dbAuthenticationService.login(this.login);
    }
    else{
      this.presentToast("Falta: "+this.field);
    }
  }
  

  
  registrar(){
    console.log('JRN: SE APRETO EL BOTON REGISTRAR');
    this.createSesionData(this.login);
  }

  createSesionData(login: any) {
    if(this.validateModel(login)){ 

      console.log('JRN: INTENTA CREAR SESION')
      let copy = Object.assign({},login);
      copy.Active=1; // Se agrega el valor active = 1 a la copia
      this.dbService.createSesionData(copy) // la copia se le apsa a la función para crear la sesion
      .then((data)=>{ // si la sentencia se ejecuto correctamente
        console.log('JRN: SENTENCIA BIEN EJECUTADA');
        this.presentToast("Bienvenido"); // Se muestra el mensaje de bienvenido
        this.storage.set("USER_DATA",data);  // Se setea el USER_DATA en el storage
        this.router.navigate(['home']); // Se navega hasta el home
      })
      .catch((error)=>{
        this.presentToast("El usuario ya existe");
        console.log('JRN: PRIMER ERROR');
      })
    }
    else{
      this.presentToast("Falta: "+this.field);
    }
    console.log('JRN: NO PASO NADA');
  }
  

  validateModel(model:any){
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (var [key, value] of Object.entries(model)) {
      // Si un valor es "" se retornara false y se avisara de lo faltante
      if (value=="") {
        // Se asigna el campo faltante
        this.field=key;
        // Se retorna false
        return false;
      }
    }
    return true;
  }

  async presentToast(message:string, duration?:number){
    const toast = await this.toastController.create(
      {
        message:message,
        duration:duration?duration:2000
      }
    );
    toast.present();
  }

  
  ionViewWillEnter(){
    console.log('ionViewDidEnter');
      // Se valida que exista una sesión activa
      this.dbService.sesionActive()
      .then((data)=>{
        if(data!=undefined){
          this.storage.set("USER_DATA",data); 
          this.router.navigate(['home']);
        }
      })
      .catch((error)=>{
        console.error(error);
        this.router.navigate(['login']);
      })
  }
  
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Creación de Usuario',
      message: 'Mensaje <strong>El usuario no existe, desea registrarlo</strong>',
      buttons: [
        {
          text: 'NO',
          role: 'cancel'
        },
        {
          text: 'SI',
          handler:() => {
            this.createSesionData(this.login)
          }
        }
      ]
    });

    await alert.present();
  }



  /*async mostrarFormulario() {
    const alert = await this.alertController.create({
      header: 'Nuevo Usuario',
      inputs: [
        {
          name: this.login.usuario,
          type: 'text',
          placeholder: 'Nombre De Usuario'
        },
        {
          name: this.login.password,
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role:'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('JRN CONFIRM CANCEL');
          }
        },
        {
          text: 'Almacenar',
          handler: (data) => {
            this.createSesionData(this.login);
          }
        }
      ],
    });

    await alert.present();
  }*/
 
}
