import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { Especialidad } from 'src/app/models/especialidad.model';
import { MedicoService, HospitalService, EspecialidadService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  especialidades: Especialidad[] = [];

  hospital: Hospital = new Hospital('', '', '', '', '', '', '', '');

  medico: Medico = new Medico('', '', '', '', '', '', '', '');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public _especialidadService: EspecialidadService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
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

    this._modalUploadService.notificacion
                            .subscribe( resp => {
                              this.medico.imageUrl = resp.medico.imageUrl;
                            });
  }

  cargarMedico( id: string ) {
    this._medicoService.cargarMedico( id)
                        .subscribe( medico => {

                          this.medico = medico;
                          this.medico.hospital = medico.hospital._id;
                          this.medico.especialidad = medico.especialidad._id;
                          // this.cambioHospital( this.medico.hospital );
                        });
  }

  guardarMedico ( f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico( this.medico )
                        .subscribe(  medico => {

                          this.medico._id = medico._id;

                          this.router.navigate(['/medico', medico._id]);
                        });
  }

  cambioHospital( id: string ) {

    this._hospitalService.obtenerHospital( id)
                         .subscribe( hospital => this.hospital = hospital);
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }

}
