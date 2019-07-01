import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  totalTiposUnidad: number;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarTipos( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/tipo?desde=' + desde;

    return this.http.get( url )
                .map( (resp: any) => {
                  this.totalTiposUnidad = resp.total;
                  return resp.tipos;
                });
  }

}
