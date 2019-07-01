import { Component, OnInit, Input } from '@angular/core';
import { FarmaciaService } from 'src/app/services/service.index';
import { Farmacia } from 'src/app/models/farmacia.model';

import Swal from 'sweetalert2';

declare var swal: any;

@Component({
  selector: 'app-farmacias',
  templateUrl: './farmacia.component.html',
  styles: []
})
export class FarmaciasComponent implements OnInit {

  farmacias: Farmacia[] = [];

  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(
    public _FarmaciaService: FarmaciaService
  ) { }

  ngOnInit() {
    this.cargarFarmacias();
  }

  cargarFarmacias() {

    this.cargando = true;

    this._FarmaciaService.cargarFarmacias( this.desde )
              .subscribe( (farmacias: any) => {
                this.totalRegistros = farmacias.total;
                this.farmacias = farmacias;
                this.cargando = false;
              });
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros) {
      return;
    }

    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarFarmacias();
  }

  buscarFarmacia( termino: string ) {
    if ( termino.length <= 0) {
      this.cargarFarmacias();
      return;
    }

    this.cargando = true;

    this._FarmaciaService.buscarFarmacia( termino)
                              .subscribe( farmacias => this.farmacias = farmacias );
                              this.cargando = false;
  }

  guardarFarmacia( farmacia: Farmacia ) {
    this._FarmaciaService.actualizarFarmacia( farmacia )
                              .subscribe();
  }

  borrarFarmacia( farmacia: Farmacia ) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Esta seguro que desea borrar: ${ farmacia.nombre }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if ( resp.value) {
        this._FarmaciaService.borrarFarmacia( farmacia._id)
                              .subscribe( () => this.cargarFarmacias());
      }
    });
  }

  crearFarmacia() {
    swal({
      title: 'Crear Especialidad',
      text: 'Ingrese el nombre de la Especialidad',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Nombre de la Especialidad',
          type: 'text'
        },
      },
      icon: 'info',
      buttons: ['Cancelar', 'Crear'],
      dangerMode: true
    }).then( (valor: string) => {

      if (!valor || valor.length === 0) {
        return;
      }

      this._FarmaciaService.crearFarmacia( valor )
                                .subscribe( () => this.cargarFarmacias());
    });
  }

}
