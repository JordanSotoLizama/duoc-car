import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  db: SQLiteObject = null;

  constructor(private router: Router) { }

  canActivate(){
    this.router.navigate(['login']);
    return false;
  }

  setDatabase(db:SQLiteObject){
    if(this.db===null){
      this.db=db;
    }
  }

  createTables():Promise<any>{
    let tables=`
    CREATE TABLE IF NOT EXISTS sesion_data
    (
      user_name TEXT PRIMARY KEY NOT NULL,
      password INTEGER NOT NULL,
      active INTEGER(1) NOT NULL
    );`;
    console.log('JRN: SE CREO LA TABLA')
    return this.db.executeSql(tables);
  }

  sesionActive(){
    let sql = `SELECT user_name,active FROM sesion_data WHERE active=1 LIMIT 1`;
    return this.db.executeSql(sql,[])
    .then(response=>{ 
      return Promise.resolve(response.rows.item(0)); 
    });
  }

  getSesionData(sesion:any){
    let sql = `SELECT user_name, active FROM sesion_data
    WHERE user_name=? AND password=? LIMIT 1`;
    return this.db.executeSql(sql,[sesion.Usuario,
      sesion.Password]).then(response=>{
        return Promise.resolve(response.rows.item(0));
      });
  }

  createSesionData(sesion:any){
    console.log('JRN: ENTRO EN DBCREATESESIONDATA');
    let sql = `INSERT INTO sesion_data(user_name,password,active)
    VALUES(?,?,?)`;
    console.log('JRN: DESPUES DEL INSERT');
    return this.db.executeSql(sql, [sesion.Usuario, 
      sesion.Password, sesion.Active]).then(response=>{
        console.log('JRN: SE CREO LA SESION');
        return Promise.resolve(response.rows.item(0));
      });;
  }

  updateSesionData(sesion:any){
    let sql = `UPDATE sesion_data
    SET active=?
    WHERE user_name=?`;
    return this.db.executeSql(sql, [sesion.active,sesion.user_name]);
  }
}
