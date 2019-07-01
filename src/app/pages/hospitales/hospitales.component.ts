import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { TipoService } from '../../services/tipos/tipos.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(
    public _hospitalService: HospitalService,
    public _tipoService: TipoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
          .subscribe( () => this.cargarHospitales());
  }

  buscarHospital( termino: string ) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;

    this._hospitalService.buscarHospital( termino )
                        .subscribe( hospitales => this.hospitales = hospitales );
                        this.cargando = false;

  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales( this.desde )
              .subscribe( (hospitales: any) => {
                this.totalRegistros = hospitales.total;
                this.hospitales = hospitales;
                this.cargando = false;
              });
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros) {
      return;
    }

    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  guardarHospital( hospital: Hospital ) {

    this._hospitalService.actualizarHospital( hospital)
                          .subscribe();
  }

  borrarHospital( hospital: Hospital) {
    this._hospitalService.borrarHospital( hospital._id)
                        .subscribe( () => this.cargarHospitales());
  }

  cambiarFoto( hospital: Hospital) {

    this._modalUploadService.mostrarModal('hospitales', hospital._id );
  }

}
