import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Especialidad } from 'src/app/models/especialidad.model';

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  totalEspecialidades: number;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarEspecialidades( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/especialidad?desde=' + desde;

    return this.http.get( url )
                .map( (resp: any) => {

                  this.totalEspecialidades = resp.total;
                  return resp.especialidades;
                });
  }

  crearEspecialidad( nombre: string) {

    const url = URL_SERVICIOS + '/especialidad' + '?token=' + this._usuarioService.token;

    return this.http.post( url, {nombre} )
    .map( (resp: any) => {
      swal('Especialidad creada', 'Especialidad creada correctamente', 'success');
      return resp.especialidad;

    });

  }

  cargarEspecialidadesTodas() {

    const url = URL_SERVICIOS + '/especialidad/todas';

    return this.http.get( url )
                .map( (resp: any) => {

                  this.totalEspecialidades = resp.total;
                  return resp.especialidades;
                });
  }

  borrarEspecialidad( id: string) {

    const url = URL_SERVICIOS + '/especialidad/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete( url)
                .map( resp => swal('Especialidad Borrada', 'Eliminado correctamente', 'success'));
  }

  guardarEspecialidad( especialidad: Especialidad ) {

    const url = URL_SERVICIOS + '/especialidad/' + '?token=' + this._usuarioService.token;

    return this.http.post( url, especialidad )
                .map( (resp: any) => {

                  swal('Especialidad Creada', especialidad.nombre, 'success');
                 return resp.especialidad;
                });
  }

  buscarEspecialidad( termino: string ) {

    if ( termino.length <= 0) {
      this.cargarEspecialidades();
      return;
    }

    const url = URL_SERVICIOS + '/busqueda/coleccion/especialidades/' + termino;
    return this.http.get( url )
                .map( (resp: any ) => resp.especialidades);
  }

  actualizarEspecialidad( especialidad: Especialidad ) {

    const url = URL_SERVICIOS + '/especialidad/' + especialidad._id + '?token=' + this._usuarioService.token;

    return this.http.put( url, especialidad )
                .map( (resp: any) => {
                  swal('Especialidad Actualizada', especialidad.nombre, 'success');
                  return resp.especialidad;
                });
  }
}
