import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Farmacia } from 'src/app/models/farmacia.model';

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class FarmaciaService {

  totalFarmacias: number;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarFarmacias( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/farmacia?desde=' + desde;

    return this.http.get( url )
                .map( (resp: any) => {

                  this.totalFarmacias = resp.total;
                  return resp.farmacias;
                });
  }

  crearFarmacia( nombre: string) {

    const url = URL_SERVICIOS + '/farmacia' + '?token=' + this._usuarioService.token;

    return this.http.post( url, {nombre} )
    .map( (resp: any) => {
      swal('Farmacia creada', 'Farmacia creada correctamente', 'success');
      return resp.farmacia;
    });

  }

  cargarFarmaciasTodas() {

    const url = URL_SERVICIOS + '/farmacia/todas';

    return this.http.get( url )
                .map( (resp: any) => {

                  this.totalFarmacias = resp.total;
                  return resp.farmacias;
                });
  }

  borrarFarmacia( id: string) {

    const url = URL_SERVICIOS + '/farmacia/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete( url)
                .map( resp => swal('Farmacia Borrada', 'Eliminado correctamente', 'success'));
  }

  guardarFarmacia( farmacia: Farmacia ) {

    const url = URL_SERVICIOS + '/farmacia/' + '?token=' + this._usuarioService.token;

    return this.http.post( url, farmacia )
                .map( (resp: any) => {
                  swal('Farmacia Creada', farmacia.nombre, 'success');
                 return resp.farmacia;
                });
  }

  buscarFarmacia( termino: string ) {

    if ( termino.length <= 0) {
      this.cargarFarmacias();
      return;
    }

    const url = URL_SERVICIOS + '/busqueda/coleccion/farmacias/' + termino;
    return this.http.get( url )
                .map( (resp: any ) => resp.farmacias);
  }

  actualizarFarmacia( farmacia: Farmacia ) {

    const url = URL_SERVICIOS + '/farmacia/' + farmacia._id + '?token=' + this._usuarioService.token;

    return this.http.put( url, farmacia )
                .map( (resp: any) => {
                  swal('Farmacia Actualizada', farmacia.nombre, 'success');
                  return resp.especialidad;
                });
  }
}
