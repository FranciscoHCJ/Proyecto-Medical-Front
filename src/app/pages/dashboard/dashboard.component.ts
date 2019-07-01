import { Component, OnInit } from '@angular/core';
import { HospitalService, EspecialidadService, MedicoService, UsuarioService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { Especialidad } from 'src/app/models/especialidad.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  hospitales: Hospital[] = [];
  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];
  usuarios: Usuario[] = [];

  totalRegistros = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _especialidadService: EspecialidadService,
    public _medicoService: MedicoService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this._hospitalService.cargarHospitales( )
              .subscribe( (hospitales: any) => this.hospitales = hospitales);

    this._especialidadService.cargarEspecialidades( )
              .subscribe( (especialidades: any) => this.especialidades = especialidades);

    this._medicoService.cargarMedicos( )
              .subscribe( (medicos: any) => this.medicos = medicos);

    this._usuarioService.cargarUsuarios( )
    .subscribe( (resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
    });
  }

}
