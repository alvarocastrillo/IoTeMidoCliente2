import { Mensaje } from "./mensaje.entidad";
import { Red } from "./red.entidad";
export class Dispositivo {
    public Id: number;
    public Id_red: number;
    public Parentid: number;
    public Tipo_disp: string;
    public Nombre: string;
    public Latitud: string;
    public Longitud: string;
    public Serial: string;
    public Marca: string;
    public Referencia: string;
    public Tag: string;
    public Tipo_com: string;
    public Direccionamiento: string;
    public Modelo: string;
    public Version_SO: string;
    public EUI: string;
    public AppEUI: string;
    public AppKEY: string;
    public APN: string;
    public Puerto: number;
    public IMEI: string;
    public Clase: string;
    public Unidad_tiempo: string;
    public Valor_UT: string;
    public countChildren: number;
    public EUIGAT: string;
    public FechaNodoAct: Date;
    public red: Red;
    public mensaje: Mensaje;
    public Batch: boolean;

    

}