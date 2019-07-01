import { Component, OnInit, Input } from '@angular/core';
import { EspecialidadService } from 'src/app/services/service.index';
import { Especialidad } from 'src/app/models/especialidad.model';

import Swal from 'sweetalert2';

declare var swal: any;

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styles: []
})
export class EspecialidadesComponent implements OnInit {

  especialidades: Especialidad[] = [];

  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(
    public _especialidadService: EspecialidadService
  ) { }

  ngOnInit() {
    this.cargarEspecialidades();
  }

  cargarEspecialidades() {

    this.cargando = true;

    this._especialidadService.cargarEspecialidades( this.desde )
              .subscribe( (especialidades: any) => {

                this.totalRegistros = especialidades.total;
                this.especialidades = especialidades;
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
    this.cargarEspecialidades();
  }

  buscarEspecialidad( termino: string ) {
    if ( termino.length <= 0) {
      this.cargarEspecialidades();
      return;
    }

    this.cargando = true;

    this._especialidadService.buscarEspecialidad( termino)
                              .subscribe( especialidades => this.especialidades = especialidades );
                              this.cargando = false;
  }

  guardarEspecialidad( especialidad: Especialidad) {
    this._especialidadService.actualizarEspecialidad( especialidad )
                              .subscribe();
  }

  borrarEspecialidad( especialidad: Especialidad) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Esta seguro que desea borrar: ${ especialidad.nombre }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if ( resp.value) {
        this._especialidadService.borrarEspecialidad( especialidad._id)
                              .subscribe( () => this.cargarEspecialidades());
      }
    });
  }

  crearEspecialidad() {
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

      this._especialidadService.crearEspecialidad( valor )
                                .subscribe( () => this.cargarEspecialidades());
    });
  }

}
