import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame = false;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }

  }

  googleInit() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '500619047500-bih5cr59fc3psk8b4r1g9rver9hs6vo6.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById( 'btnGoogle') );

    });

  }

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this.zone.run( () => {
        this._usuarioService.loginGoogle( token )
                            .subscribe( () => this.router.navigate(['/dashboard']) );
           });
      });
  }

  ingresar( forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario(null, null, forma.value.email, forma.value.password);

    this._usuarioService.loing( usuario, forma.value.recuerdame)
                  .subscribe( correcto => this.router.navigate(['/perfil']) );

    // this.router.navigate([ '/dashboard' ]);

  }

}
