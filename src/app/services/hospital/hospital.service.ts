import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get( url)
                .map( (resp: any) => {
                  this.totalHospitales = resp.total;
                  return resp.hospitales;
                });
  }

  obtenerHospital( id: string ) {

    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.hospital);
  }

  borrarHospital( id: string) {

    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete( url)
                .map( resp => swal('Hospital Borrado', 'Eliminado correctamente', 'success'));
  }

  guardarHospital( hospital: Hospital ) {

    const url = URL_SERVICIOS + '/hospital/' + '?token=' + this._usuarioService.token;

    return this.http.post( url, hospital )
                .map( (resp: any) => {

                  swal('Hospital Creado', hospital.nombre, 'success');
                 return resp.hospital;
                });
  }

  buscarHospital( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
                .map( (resp: any ) => resp.hospitales);
  }

  actualizarHospital( hospital: Hospital) {

    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital)
                .map( (resp: any) => {
                  swal('Hospital Actualizado', hospital.nombre, 'success');
                  return resp.hospital;
                });
  }
}

