import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
import { Red } from '../models/red.entidad';


import { tokens } from '../tokens/token';

const APi_URL = 'https://localhost:44371/api/Red/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RedService {

  constructor( public http: HttpClient) { }
  
  getListRedes(id_empresa: number): Observable<Red[]>{
    let token = new tokens();


    // httpOptions.headers.append('Authorization', 'Bearer ' + token.ObtenerToken());
     return this.http.get<Red[]>(`${APi_URL}GetRedLista/${id_empresa}`, httpOptions);
 }

 getRedesTipoCom(red: Red): Observable<Red[]> {
  let token = new tokens();
  // httpOptions.headers.append('Authorization', 'Bearer ' + token.ObtenerToken());
   return this.http.post<Red[]>(`${APi_URL}getRedesTipoCom`, JSON.stringify(red), httpOptions);
}

 getRed(red: Red): Observable<Red>{

     let token = new tokens();

     
     // httpOptions.headers.append('Authorization','Bearer ' + token.ObtenerToken());
      return this.http.post<Red>(`${APi_URL}GetRed`, JSON.stringify(red), httpOptions);
 }

 setInsertRed(red: Red): Observable<Red>{
     

     let token = new tokens();


     //  httpOptions.headers.append('Authorization', 'Bearer ' + token.ObtenerToken());
      return this.http.post<Red>(`${APi_URL}InsertRed`, JSON.stringify(red), httpOptions);
 }

 setUpdateRed(red: Red): Observable<Red>{

     let token = new tokens();


     // httpOptions.headers.append('Authorization','Bearer ' + token.ObtenerToken());
      return this.http.post<Red>(`${APi_URL}EditarRed`, JSON.stringify(red), httpOptions);
 }
 
DeleteRed(red: Red): Observable<Red>{

  let token = new tokens();

  
  // httpOptions.headers.append('Authorization','Bearer ' + token.ObtenerToken());
   return this.http.post<Red>(`${APi_URL}DeleteRed`, JSON.stringify(red), httpOptions);
}
 
}
