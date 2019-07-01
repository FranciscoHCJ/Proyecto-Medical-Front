import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imageUrl: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/imageUrl';

    if (!imageUrl) {
      return url + '/usuarios/xxx';
    }

    if (imageUrl.indexOf('https') >= 0 ) {
      return imageUrl;
    }

    switch (tipo) {

      case 'usuario':
         url = imageUrl;
      break;

      case 'medico':
         url = imageUrl;
      break;

      case 'hospital':
         url = imageUrl;
      break;

      default:
        console.log('Tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usuarios/xxx';
        break;
    }
    return url;
  }

}
