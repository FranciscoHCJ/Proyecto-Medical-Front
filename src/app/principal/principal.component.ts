import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { Medico } from '../models/medico.model';
import { Hospital } from '../models/hospital.model';
import { Especialidad } from '../models/especialidad.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS } from 'src/app/config/config';

declare function init_plugins();

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];
  especialidades: Especialidad[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params
                  .subscribe( params => {

                    const termino = params['termino'];
                    this.buscar( termino );

                  });
  }

  ngOnInit() {
    init_plugins();
  }

  buscar( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get( url )
              .subscribe( (resp: any) => {

                console.log(resp);
                this.hospitales = resp.hospitales;
                this.medicos = resp.medicos;
                this.usuarios = resp.usuarios;
                this.especialidades = resp.especialidades;
              });
  }

}
