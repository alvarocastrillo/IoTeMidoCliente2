import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
import { Dispositivo } from '../models/dispositivo.entidad';
import { Red } from '../models/red.entidad';

import { tokens } from '../tokens/token';

const APi_URL = 'https://localhost:44371/api/Dispositivo/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(public http: HttpClient) { }
  
  getListaDispositivoxRed(dispositivo: Dispositivo): Observable<Dispositivo[]>{

    let token = new tokens();


     //httpOptions.headers.append('Authorization', 'Bearer ' + token.ObtenerToken());
     return this.http.post<Dispositivo[]>(`${APi_URL}getListaDispositivoxRed`, JSON.stringify(dispositivo), httpOptions);
  }

  getListaNodoxRed(dispositivo: Dispositivo): Observable<Dispositivo[]>{

    let token = new tokens();


    // httpOptions.headers.append('Authorization', 'Bearer ' + token.ObtenerToken());
     return this.http.post<Dispositivo[]>(`${APi_URL}getListaNodoxRed`, JSON.stringify(dispositivo), httpOptions);
  }
  
  getDispositivo(dispositivo: Dispositivo): Observable<Dispositivo> {
      
    let token = new tokens();
  
  
    //httpOptions.headers.append('Authorization', 'Bearer ' + token.ObtenerToken());
    return this.http.post<Dispositivo>(`${APi_URL}getDispositivo`, JSON.stringify(dispositivo), httpOptions);
  }

  getEuigat(dispositivo: Dispositivo): Observable<Dispositivo> {
      
    let token = new tokens();
  
  
    // httpOptions.headers.append('Authorization', 'Bearer ' + token.ObtenerToken());
    return this.http.post<Dispositivo>('api/Dispositivo/getEuigat', JSON.stringify(dispositivo), httpOptions);
  }

  getDisp(dispositivo: Dispositivo): Observable<Dispositivo> {
      
    let token = new tokens();

    // httpOptions.headers.append('Authorization', 'Bearer ' + token.ObtenerToken());
    return this.http.post<Dispositivo>('api/Dispositivo/getDisp', JSON.stringify(dispositivo), httpOptions);
  }
  
  setInsertDispositivo(dispositivo: Dispositivo): Observable<Dispositivo> {

    let token = new tokens();


    //  httpOptions.headers.append('Authorization', 'Bearer ' + token.ObtenerToken());
     return this.http.post<Dispositivo>('api/Dispositivo/InsertDispositivo', JSON.stringify(dispositivo), httpOptions);
  }

  setUpdateDispositivo(dispositivo: Dispositivo): Observable<Dispositivo> {

      let token = new tokens();


      // httpOptions.headers.append('Authorization', 'Bearer ' + token.ObtenerToken());
      return this.http.post<Dispositivo>('api/Dispositivo/UpdateDispositivo', JSON.stringify(dispositivo), httpOptions);
  }
  

  
  DeleteDispositivo(dispositivo: Dispositivo): Observable<Dispositivo> {

    let token = new tokens();


    // httpOptions.headers.append('Authorization', 'Bearer ' + token.ObtenerToken());
    return this.http.post<Dispositivo>('api/Dispositivo/DeleteDispositivo', JSON.stringify(dispositivo), httpOptions);
  }
  
  CountDispositivoChildren(dispositivo: Dispositivo): Observable<Dispositivo> {
      
    let token = new tokens();
  
  
    //httpOptions.headers.append('Authorization', 'Bearer ' + token.ObtenerToken());
    return this.http.post<Dispositivo>('api/Dispositivo/CountDispositivoChildren', JSON.stringify(dispositivo), httpOptions);
  }

  setUpdateFechaNodoAct(dispositivo: Dispositivo): Observable<Dispositivo> {

    let token = new tokens();
    //  httpOptions.headers.append('Authorization','Bearer ' + token.ObtenerToken());
     return this.http.post<Dispositivo>('api/Dispositivo/UpdateFechaAct' , JSON.stringify(dispositivo) , httpOptions);
  }

  verificarImei(dispositivo: Dispositivo): Observable<Dispositivo[]>{

    let token = new tokens();


     //httpOptions.headers.append('Authorization', 'Bearer ' + token.ObtenerToken());
     return this.http.post<Dispositivo[]>('api/Dispositivo/verificarImei', JSON.stringify(dispositivo), httpOptions);
  }

  
  verificarEui(dispositivo: Dispositivo): Observable<Dispositivo[]>{

    let token = new tokens();


     //httpOptions.headers.append('Authorization', 'Bearer ' + token.ObtenerToken());
     return this.http.post<Dispositivo[]>('api/Dispositivo/verificarEui', JSON.stringify(dispositivo), httpOptions);
  }
  
  
 
 
}
