import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
import { tokens } from '../tokens/token';

import {Lista} from '../models/lista.entidad';

const APi_URL = 'https://localhost:44371/api/Lista/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8','Accept': 'application/json'})
  };

@Injectable()
export class ListaService {
  

    constructor(
        public http: HttpClient
    ){}

    getListas(listaParametro:String[]) : Observable<Lista[]>{        
      let token = new tokens();         
        // httpOptions.headers.append('Authorization', 'Bearer ' + token.ObtenerToken());
        return this.http.post<Lista[]>(`${APi_URL}GetListas`, listaParametro, httpOptions);
    }


}