import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Router } from '@angular/router';
import swal from 'sweetalert';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {
    this.cargarStorage();
    // Actualiza la imagen del usuario logueado
    this._modalUploadService.notificacion.subscribe( resp => {
      if ( this.usuario._id === resp.usuario._id ) {
        this.guardarStorage( this.usuario._id, this.token, resp.usuario, resp.menu);
      }
    });
  }

  estaLogueado() {
    return (this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
      this.menu = JSON.parse( localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify( usuario ));
    localStorage.setItem('menu', JSON.stringify( menu ));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['login']);
  }

  loginGoogle( token: string ) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url , { token} )
                .map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp. usuario, resp.menu);
                  return true;
                });
  }

  loing( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }


    const url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario)
                .map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp. usuario, resp.menu);
                  return true;
                })
                .catch( err => {
                  swal('Error en el login', err.error.mensaje, 'error');
                  return Observable.throw( err );
                });
  }

  crearUsuario( usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
    .map( (resp: any) => {
      swal('Usuario creado', usuario.email, 'success');
      return resp.usuario;
    })
    .catch( err => {
      swal(err.error.mensaje, err.error.errors.message, 'error');
      return Observable.throw( err );
    });

  }

  actualizarUsuario( usuario: Usuario ) {

    const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

    return this.http.put( url, usuario)
                .map( (resp: any) => {

                  if ( usuario._id === this.usuario._id) {
                    const usuarioDB: Usuario = resp.usuario;
                    this.guardarStorage( usuarioDB._id, this.token, this.usuario, this.menu);
                  }

                  swal('Usuario actualizado', usuario.nombres, 'success');

                  return true;
                });

  }

  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
        .then( (resp: any) => {

          this.usuario.img = resp.usuario.img;
          swal('Imagen Actualizada', this.usuario.nombres, 'success');

          this.guardarStorage( id, this.token, this.usuario, this.menu);
        })
        .catch( resp => {
          console.log(resp);
        });

  }

  cargarUsuarios( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get( url );
  }

  buscarUsuarios( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url )
                .map( (resp: any ) => resp.usuarios);
  }

  borrarUsuario( id: string ) {

    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete( url )
                .map( resp => {
                  swal('Usuario Borrado', 'El usuario a sido eliminado correctamente', 'success');
                  return true;
                });
  }

}
