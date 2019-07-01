import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';
import swal from 'sweetalert';
import {ViewChild} from '@angular/core';


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  @ViewChild( 'inputFile' ) inputFile: any;

  constructor( public _subirArchivoService: SubirArchivoService,
                public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  limpiarForm() {
    // console.log('Aqui obtienes el elemento para atribuir algo valido', this.inputFile.nativeElement);
    this.inputFile.nativeElement.value = '';
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }

  seleccionImagen( archivo: File ) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }

  subirImagen() {
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
          .then( resp => {

            this._modalUploadService.notificacion.emit( resp );
            this.limpiarForm();
            this.cerrarModal();

          })
          .catch( err => {
            console.log('Error en la carga....');
          });
  }

}
