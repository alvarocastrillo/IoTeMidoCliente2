import { JwtHelperService } from "@auth0/angular-jwt";
//import { Permisos } from "../entidades/login.entidad";
//import { Empresa } from "../entidades/empresa.entidad";

export class tokens
{
    /**
     * ObtenerPermisos
     */

    public ObtenerNombreUsuario(): string {


        const helper = new JwtHelperService();
        let tokens = sessionStorage.getItem('token');
        let  decodedToken = helper.decodeToken(tokens).NombreUsuario;

        return decodedToken;
    }

    public ObtenerIdUsuario():String {

       let idUsuario: String;
        const helper = new JwtHelperService();
        let tokens = sessionStorage.getItem("token");
        idUsuario = helper.decodeToken(tokens).IdUsuario;

        return idUsuario;
    }

    public isAuthenticated():String {

        let isAuthenticated: String;
         const helper = new JwtHelperService();
         let tokens = sessionStorage.getItem("token");
         isAuthenticated = helper.decodeToken(tokens).isAuthenticated;
 
         return isAuthenticated;
     }

     public searchPermiso(key):String {

        let idPermiso: String;
        const helper = new JwtHelperService();
        let tokens = sessionStorage.getItem("token");
        idPermiso = helper.decodeToken(tokens)[key]
         return idPermiso;
     }

    // public ObtenerPermisos():Permisos[] {

    //     let permisos: Permisos[];
    //     const helper = new JwtHelperService();
    //     let tokens = sessionStorage.getItem('token');
    //     let  decodedToken = helper.decodeToken(tokens).Permisos;
    //     permisos = JSON.parse(decodedToken);
    //     return permisos;
    // }

    public ObtenerIdEmpresa(): Number {

        let idEmpresa: Number;
        const helper = new JwtHelperService();
        let tokens = sessionStorage.getItem('token');
        idEmpresa = Number(helper.decodeToken(tokens).IdEmpresa);
        return idEmpresa;
    }


    // public ObtenerEmpresas():Empresa[] {

    //     let empresa:Empresa[];
    //     const helper = new JwtHelperService();
    //     let tokens = sessionStorage.getItem("token");
    //     let  decodedToken = helper.decodeToken(tokens).Empresas;
    //     empresa = JSON.parse(decodedToken);
    //     return empresa;
    // }

    
    // public ObtenerNombre():string {
        
    //     let empresa:Empresa[];
    //     const helper = new JwtHelperService();
    //     let tokens = sessionStorage.getItem('token');
    //     let  decodedToken = helper.decodeToken(tokens).NombreUsuario;
    //     return decodedToken;
    // }

    public ClaveInsegura(): string {
        const helper = new JwtHelperService();
        let tokens = sessionStorage.getItem('token');
        let  decodedToken = helper.decodeToken(tokens).ClaveInsegura;
        return decodedToken;
    }

    // public ObtenerToken(): String {

    //     let empresa:Empresa[];
    //     const helper = new JwtHelperService();
    //     let tokens = sessionStorage.getItem('token');

    //     return tokens;
    // }

}