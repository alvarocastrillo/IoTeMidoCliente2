import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserAuth } from '../models/userauth';
import { User } from '../models/User';
import { tap, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { tokens } from '../tokens/token';

const APi_URL = 'https://localhost:44371/api/security/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  securityObject: UserAuth = new UserAuth();

  constructor(private http: HttpClient, private token: tokens) { }

  
  resetSecutityObject() {
    //this.securityObject.userName = '';
    //this.securityObject.bearerToken = '';
    this.securityObject.token = '';
    this.securityObject.mensaje = null;
    // this.securityObject.permisos = [];
    // this.securityObject.isAuthenticated = false;
    // this.securityObject.claims = [];
  }

  login(entity: User) {

    // return this.http.post<AppUserAuth>('https://localhost:44328/api/Security/login', JSON.stringify(entity) , httpOptions);
    //this.resetSecutityObject();

    return this.http.post(`${APi_URL}ValidarUsuario`, entity, httpOptions)
      .pipe(
        tap((resp: UserAuth) => {
          Object.assign(this.securityObject, resp);
          sessionStorage.setItem("token", this.securityObject.token);
        }),
        catchError(this.handleError)
      )
      
  }

  logout() {
   this.resetSecutityObject();
   sessionStorage.removeItem('token');
  }

  handleError(err: any) {
    return throwError(err.error);
  }

  hasClaim(cliamType: any, claimValue?: any) {
    let ret: boolean = false;

    if (typeof cliamType === 'string') {
      ret = this.isClaimValid(cliamType, claimValue);
    } else {
      let claims: string[] = cliamType;
      if (claims) {
        for (let index = 0; index < claims.length; index++) {
          ret = this.isClaimValid(claims[index]);
          if (ret) {
            break;
          }         
        }
      }
    }

    return ret;
  }

  isClaimValid(cliamType: string, claimValue?: string) {
    let ret: boolean = false;
    let auth: UserAuth = null;

    auth =  this.securityObject;
    if (auth) {
      // if (cliamType.indexOf(':') >= 0) {
      //   let words: string[] = cliamType.split(':');
      //   cliamType = words[0].toLowerCase();
      //   claimValue = words[1];
      // } else {
      //   cliamType = cliamType.toLowerCase();
      //   claimValue = claimValue ? claimValue : 'true';
      // }
      let valor = this.token.searchPermiso(cliamType);
      if(valor != null){
        if(valor == "16"){
          ret = true;
        }
      }
      // if("Dashboard-Insertar" ==cliamType && "16" ==  claimValue) {
      //   ret = true;
      // }
      // ret = auth.claims.find( c => c.claimType.toLowerCase() == cliamType && c.claimValue == claimValue) != null;
    }

    return ret;
  }



}
