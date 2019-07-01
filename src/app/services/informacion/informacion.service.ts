import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  cargarMedico( id: string) {

    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url )
                    .map( (resp: any) => resp.medico);
  }
}
