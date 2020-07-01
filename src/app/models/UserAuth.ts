import { UserClaims } from './UserClaims';
import { Mensaje } from './mensaje.entidad';
import { Permisos } from './permisos.entidad';

export class UserAuth {
  //  userName: string = '';
    // bearerToken: string = '';
    token: string = '';
    mensaje: Mensaje = new Mensaje();
  //  isAuthenticated: boolean = false;
  //  claims: UserClaims[] = [];
    //permisos: Permisos[] = [];
}