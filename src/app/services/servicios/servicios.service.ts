import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse  } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  paginaPartesSancionar = 0;
  paginaPartesNotificar = 0;
  estadoConsulta;
  configUrl;

  constructor(private http:HttpClient) { }

  

  getCatalogoById(idCatalogo){
    return this.http.get(environment.URL_SERVICIOS+'/rtv/catalogo/findAllByCodi/'+idCatalogo);
  }


}
