import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { tokens } from '../tokens/token';
import { RedService } from '../services/red.service';
import { Persona } from '../models/persona.entidad';
import { Red } from '../models/red.entidad';
import { Lista } from '../models/lista.entidad';
import { ListaService } from '../services/lista.service';
import { Dispositivo } from '../models/dispositivo.entidad';
import { DispositivoService } from '../services/dispositivo.service';



declare const $: any;
@Component({
  selector: 'app-red',
  templateUrl: './red.component.html',
  styleUrls: ['./red.component.scss']
})
export class RedComponent implements OnInit {
  persona: Persona;
  listaRed: Red[];
  columnaIndex: number;
  filaIndex: number;
  id: number;
  nombreRed: string;
  listTipoCom: Lista[];
  res: Red;
  titleEstado: string;
  nombreRep: boolean;
  showViewRed : boolean;
  permisoEncontrado: boolean;

  // formRed = this.fb.group({
  //   Id: [null],
  //   Nombre: ['', Validators.required],
  //   Tipo_com: ['', Validators.required],
  // });
  formRed = this.fb.group({
    Id: [null],
    Nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
    Tipo_com: new FormControl('', [Validators.required])
  });

  constructor(private serviceRed: RedService,
    private fb: FormBuilder, private token: tokens,
     private listaServicio: ListaService, private serviceDispositivo: DispositivoService) {

     }   
  ngOnInit(): void {
    this.getRedes();
    let valor = this.token.searchPermiso("RedesInsertar");
    if(valor == "16"){
      this.permisoEncontrado = true; 
    }else{
      this.permisoEncontrado = false;
    }
  }

  get Nombre() { return this.formRed.get('Nombre'); }
  get Tipo_com() { return this.formRed.get('Tipo_com'); }

    goBackRedes() {
      $('#dataRed').DataTable().destroy();
      this.getRedes();
    }
    getRedes(): void {
      let table;
  
      this.persona = new Persona();
      this.persona.id = Number(this.token.ObtenerIdUsuario().toString());
      // this.personaService.getPersonaEmpresa(this.persona).subscribe(persona => {
        // this.persona = persona;
        let id_Empresa;
        id_Empresa =  Number(this.token.ObtenerIdEmpresa());
          this.serviceRed.getListRedes(id_Empresa).subscribe(listaRed => {
              this.listaRed = listaRed;
                for (let index = 0; index < listaRed.length; index++) {
                  if (listaRed[index]['tipo_com'] == 'TIPOCOMU.L') {
                    listaRed[index]['tipo_com'] = 'LORA';
                  } else if (listaRed[index]['tipo_com'] == 'TIPOCOMU.C') {
                    listaRed[index]['tipo_com'] = 'CELULAR';
                  } else if (listaRed[index]['tipo_com'] == 'TIPOCOMU.W') {
                    listaRed[index]['tipo_com'] = 'WIFI';
                  } else if (listaRed[index]['tipo_com'] == 'TIPOCOMU.S') {
                    listaRed[index]['tipo_com'] = 'SIGFOX';
                  }
                  
                }
              
              $('#dataRed').empty();
  
              $('#iconoEspera').hide();
  
              
              this.iniciarTabla();
  
              table = $('#dataRed').DataTable();
              table.clear();
              table.rows.add(listaRed);
              table.draw();
              
  
  
          });
      // });
    }


    
  iniciarTabla() {
    const tabla = $('#dataRed').DataTable({
      columns: [
        { title: 'NOMBRE', data: 'nombre' , width: '45%'},
        { title: 'COMUNICACIÓN', data: 'tipo_com', width: '40%' },
        

      ],

      columnDefs: [

        {
          targets: [2],
          data: null,
          // width: '0.1%',
          orderable: false,
          render: (data, type, full, meta) => {
            
            return  '<button id="' + full.id + '"  class="btn btn-success" title="Editar" data-element-id=' + full.id + ' data-element-nombre="' + full.nombre + '"><i class="fa fa-pencil-square-o" aria-hidden="true" ></i></button> '          
          }
        },
        {
          targets: [3],
          data: null,
          // width: '0.1%',
          orderable: false,
              render:  ( data, type, full, meta ) => {
              return  '<button id="' + full.id + '"  class="btn btn-danger" title="Eliminar"  data-element-id=' + full.id + ' data-element-nombre="' + full.nombre + '"><i class="fa fa-close" aria-hidden="true" ></i></button>';
            }
        },

      ],
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      // responsive: true,
      scrollY: '70vh',
      scrollCollapse: true,
      language: {
        sProcessing: 'Procesando...',
        sLengthMenu: 'Mostrar _MENU_ registros',
        sZeroRecords: 'No se encontraron resultados',
        sEmptyTable: 'Ningún dato disponible en esta tabla',
        sInfo:
          'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
        sInfoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
        sInfoFiltered: '(filtrado de un total de _MAX_ registros)',
        sInfoPostFix: '',
        sSearch: 'Buscar:',
        sUrl: '',
        sInfoThousands: ',',
        sLoadingRecords: 'Cargando...',
        oPaginate: {
          sFirst: 'Primero',
          sLast: 'Último',
          sNext: 'Siguiente',
          sPrevious: 'Anterior'
        },
        oAria: {
          sSortAscending:
            ': Activar para ordenar la columna de manera ascendente',
          sSortDescending:
            ': Activar para ordenar la columna de manera descendente'
        },
        CurrentRow : true
      }

      
    });




    
    $('#dataRed tbody').on('click', 'td', event => {
      this.columnaIndex = event.currentTarget.cellIndex;
    });

    $('#dataRed tbody').on('click', 'tr', event => {

      this.filaIndex = event;
      let nombre: string;
      
      this.id = Number(event.currentTarget.cells[2].children[0].dataset.elementId);
      nombre = event.currentTarget.cells[2].children[0].dataset.elementNombre;
      this.nombreRed = nombre;
      let red: Red;
          red = new Red();
          red.Id = this.id;
        

      if (this.columnaIndex === 2) {
      
          let lista: string[];
          lista = ['TIPOCOMU'];
          this.listaServicio.getListas(lista).subscribe(res => {
            this.listTipoCom = res[0].listas;
          });
          this.serviceRed.getRed(red).subscribe(res => {
          this.res = new Red();  
          this.res = res;
                this.formRed.patchValue({
                  Id: res['id'],
                  Nombre: res['nombre'],
                  Tipo_com: res['tipo_com'],
                  
                });
          this.showViewRed = true;
          //$('#ModalFormRed').modal();
          this.titleEstado = 'Editar Red';
  
  
          });

      } else if (this.columnaIndex === 3) {
      

          let cuerpo = '¿Esta seguro de eliminar la Red : ' + nombre + '?';
          let titulo = 'Advertencia';
          let nVentana = 'v1';
          let label1 = 'Si';
          let label2 = 'No';
          let tipo = 1;
          this.deleteRed(this.id);
         // this.alertMsj(titulo , cuerpo, nVentana, label1, label2, tipo);


      }
    });
  }
  
  showFormCreacion(): void {
    this.res = null;

    let lista: string[];
    lista = ['TIPOCOMU'];
    this.listaServicio.getListas(lista).subscribe(res => {
      this.listTipoCom = res[0].listas;
      this.showViewRed = true;
    });

    //$('#ModalFormRed').modal();

    this.formRed.reset();
    this.titleEstado = 'Creación de Red';


    //$('#iconoEspera').show();
      
    
    //$('#iconoEspera').hide();

  }
  
  onClicGuardar(): void {
    if (this.formRed.valid) {
      if (this.res == null)
      {
        
        let nombre;
        let count;
        nombre = this.formRed.value.Nombre;
        
        // count = this.listaRed.filter(x => x['nombre'] == nombre).length;
        // if (count == 0) {
          this.res = new Red();
          this.res.Id_empresa = Number(this.token.ObtenerIdEmpresa());
          this.res.Nombre = this.formRed.value.Nombre;
          this.res.Tipo_com = this.formRed.value.Tipo_com;
          
          this.nombreRep = false;
          let red = new Red();
          
          this.serviceRed.setInsertRed(this.res).subscribe(resp => {
            red = resp;
            setTimeout(() => {
              if (red['mensaje']['id']) {
                $('#iconoEspera').show();
              //  this.notificacion.showNotification('Red', this.res.Nombre, 'creado');
              }
        
            });
            this.goBack();
          });
          
        // } else {
        //   this.nombreRep = true;
        //   setTimeout(() => {
        //     this.nombreRep = false;
        //   }, 1300);
        // }

      }
      else
      {
            this.onClicUpdate();

      }
    }

  }
  deleteRed(id: number) {
    let red = new Red();
    red.Id = id;
    this.serviceRed.DeleteRed(red).subscribe(res => {
      if (res['mensaje']['titulo'] === "")  {
       // this.notificacion.showNotification('Red', this.nombreRed, 'eliminado');
        //$('#alertRed').modal('hide');
        $('#dataRed').DataTable().destroy();
        this.getRedes();
      } else {
        $('#alertRed').modal('hide');
        let cuerpo = "No se puede eliminar este registro porque tiene Dispositivos dependiendo";
        let titulo = "Información";
        let nVentana = "v2";
        let label1 ="Aceptar";
        let tipo = 0;


        //this.alertMsj(titulo , cuerpo, nVentana, label1,"", tipo);
       
      }

    });
  }
  
  onClicUpdate() {
    let nombre;
    let count;
    nombre = this.formRed.value.Nombre;
    let dispositivo = new Dispositivo();
    dispositivo.Id_red = this.formRed.value.Id
    let red = new Red();
    red.Id = this.formRed.value.Id;
    red.Nombre = this.formRed.value.Nombre;
    red.Tipo_com = this.formRed.value.Tipo_com;
    
    if (this.res['nombre'] == nombre) {
      if (this.res['tipo_com'] == this.formRed.value.Tipo_com) {



        this.serviceRed.setUpdateRed(red).subscribe(res => {
          // red = res;
          
            if(res['mensaje']['id']) {
              $('#iconoEspera').show();
             // this.notificacion.showNotification('Red', red.Nombre, 'actualizado');
            }
          
          this.goBack();
        }); 
      } else if (this.res['tipo_com'] != this.formRed.value.Tipo_com) {
        this.serviceDispositivo.getListaDispositivoxRed(dispositivo).subscribe(resp => {
          if (resp.length > 0) {
            this.showViewRed = false;
           // $('#ModalFormRed').modal('hide');
            let cuerpo = 'No se puede actualizar el tipo de comunicación, porque tiene dispositivos configurados';
            let titulo = 'Información';
            let nVentana = 'v3';
            let label1 = 'Aceptar';
            let tipo = 0;
    
           // this.alertMsj(titulo , cuerpo, nVentana, label1, '', tipo);
          } else {

            
            this.serviceRed.setUpdateRed(red).subscribe(res => {
              // red = res;
              
                if(res['mensaje']['id']) {
                  $('#iconoEspera').show();
                  //this.notificacion.showNotification('Red', red.Nombre, 'actualizado');
                }
              
              this.goBack();
            }); 
          }
  
        });
        
      }
       
    } else if (this.res['nombre'] != nombre) {
      count = this.listaRed.filter(x => x['nombre'] == nombre).length;
      if (count == 0) {

        if (this.res['tipo_com'] == this.formRed.value.Tipo_com) {

          this.serviceRed.setUpdateRed(red).subscribe(res => {
            // red = res;
            
              if(res['mensaje']['id']) {
                $('#iconoEspera').show();
               // this.notificacion.showNotification('Red', red.Nombre, 'actualizado');
              }
            
            this.goBack();
          }); 
        } else if (this.res['tipo_com'] != this.formRed.value.Tipo_com) {
          this.serviceDispositivo.getListaDispositivoxRed(dispositivo).subscribe(resp => {
            if (resp.length > 0) {
              $('#ModalFormRed').modal('hide')
              let cuerpo = 'No se puede actualizar el tipo de comunicación, porque tiene dispositivos configurados';
              let titulo = 'Información';
              let nVentana = 'v3';
              let label1 = 'Aceptar';
              let tipo = 0;
      
             // this.alertMsj(titulo , cuerpo, nVentana, label1, '', tipo);
            } else {
              
              this.serviceRed.setUpdateRed(red).subscribe(res => {
                // red = res;
                
                  if(res['mensaje']['id']) {
                    $('#iconoEspera').show();
                 //   this.notificacion.showNotification('Red', red.Nombre, 'actualizado');
                  }
                
                this.goBack();
              }); 
            }
    
          });
          
        }
      } else {
        this.nombreRep = true;
        setTimeout(() => {
          this.nombreRep = false;
        }, 1300);
      }
    }

    
   
    

  }

  convertirLetraMayuscula(): void  {
    let nombre;
    nombre = this.formRed.value.Nombre;
    nombre = nombre.toUpperCase();
    this.formRed.patchValue({Nombre : nombre });
    // count = this.listaRed.filter(x => x['nombre'] == nombre);
    // count = this.listaRed.filter(x => x['nombre'] == nombre).length;
    
  }

  goBack(): void {
   
    $('#iconoEspera').hide();
    $('#dataRed').DataTable().destroy();
    
    this.getRedes();
    this.showViewRed = false;
   // $('#ModalFormRed').modal('hide');
  }

  hideWindows(): void {
    this.showViewRed = false;
    // $('#ModalFormRed').modal('hide');
  }

}
