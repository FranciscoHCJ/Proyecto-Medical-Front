import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  desde = 0;
  totalRegistros = 0;

  constructor(
    public _medicosService: MedicoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicosService.cargarMedicos( this.desde)
                        .subscribe( (medicos: any) => {

                          this.totalRegistros = medicos.total;
                          this.medicos = medicos;
                        } );
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
    this.cargarMedicos();
  }

  buscarMedico( termino: string) {
    if ( termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicosService.buscarMedico( termino)
                        .subscribe( medicos => this.medicos = medicos);
  }

  borrarMedico( medico: Medico ) {
    this._medicosService.borrarMedico( medico._id)
                        .subscribe( () => this.cargarMedicos());
  }

  mostrarModal( id: string) {

    this._modalUploadService.mostrarModal( 'medicos', id );

  }
}
