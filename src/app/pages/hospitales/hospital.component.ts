import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HospitalService } from 'src/app/services/service.index';
import { TipoService } from 'src/app/services/tipos/tipos.service';

import { Hospital } from 'src/app/models/hospital.model';
import { Tipo } from 'src/app/models/tipo.model';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  hospital: Hospital = new Hospital('', '', '', '', '', '', '', '');

  tipos: Tipo[] = [];

  constructor(
    public _hospitalService: HospitalService,
    public _tiposUnidad: TipoService
  ) { }

  ngOnInit() {
    this._tiposUnidad.cargarTipos()
                             .subscribe( tipos => this.tipos = tipos);
  }

  guardarHospital(f: NgForm) {

    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._hospitalService.guardarHospital( this.hospital )
                          .subscribe( hospital => {
                            console.log(hospital);
                          });
  }

}
