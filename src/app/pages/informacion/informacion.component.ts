import { Component, OnInit } from '@angular/core';

import { Medico } from 'src/app/models/medico.model';
import { Especialidad } from 'src/app/models/especialidad.model';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { Router, ActivatedRoute } from '@angular/router';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styles: []
})
export class InformacionComponent implements OnInit {

  hospitales: Hospital[] = [];
  especialidades: Especialidad[] = [];

  hospital: Hospital = new Hospital('', '', '');

  medico: Medico = new Medico('', '', '', '', '', '', '');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public _especialidadService: EspecialidadService,
    public router: Router,
    public activateRoute: ActivatedRoute,
  ) {
    activateRoute.params.subscribe( params => {

      const id = params['id'];

      if ( id !== 'nuevo') {
        this.cargarMedico( id );
      }
    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
                         .subscribe( hospitales => this.hospitales = hospitales);

    this._especialidadService.cargarEspecialidadesTodas()
                             .subscribe( especialidades => this.especialidades = especialidades);
  }

  cargarMedico( id: string ) {
    this._medicoService.cargarMedico( id)
                        .subscribe( medico => {

                          this.medico = medico;
                          this.medico.hospital = medico.hospital._id;
                          this.medico.especialidad = medico.especialidad._id;
                        });
  }


}
