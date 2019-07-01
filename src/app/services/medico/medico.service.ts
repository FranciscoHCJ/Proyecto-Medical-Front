import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/medico?desde=' + desde ;

    return this.http.get( url )
                .map( (resp: any) => {

                  this.totalMedicos = resp.total;
                  return resp.medicos;
                });
  }

  cargarMedico( id: string) {

    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url )
                    .map( (resp: any) => resp.medico);
  }

  buscarMedico( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url )
                .map( (resp: any ) => resp.medicos);
  }

  borrarMedico( id: string ) {

    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete( url)
                    .map( resp => {

                      swal('Médico Borrado', 'Médico borrado correctamente', 'success');
                      return resp;
                    });
  }

  guardarMedico( medico: Medico ) {

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      // Actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, medico )
                      .map( (resp: any) => {
                        swal('Médico Actualizado', medico.nombres, 'success');
                        return resp.medico;
                      });
    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, medico )
                .map( (resp: any) => {
                  swal('Médico Creado', medico.nombres, 'success');
                  return resp.medico;
                });

    }

  }
}
