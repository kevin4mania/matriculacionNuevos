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

  

  createTramite(form){
    return this.http.post(environment.URL_SERVICIOS+'/tramite/insert',form);
  }

  finalizarTramite(form){
    return this.http.post(environment.URL_SERVICIOS+'/tramite/update',form);
  }

  deleteTramite(idTr,user){
    return this.http.get(environment.URL_SERVICIOS+'/tramite/updateEstadoById/' +idTr+'/INA/'+user);
  }

  recuperarTramite(idTr,user){
    return this.http.get(environment.URL_SERVICIOS+'/tramite/updateEstadoById/' +idTr+'/GEN/'+user);
  }

  getTramites(idPc,nmTr,codEst,usCr,orderBy,numPage,regxPage){
    return this.http.get(environment.URL_SERVICIOS+'/tramite/findAllByCriterio/' + idPc + '/' + nmTr+ '/' + codEst + '/'+usCr+'/'+ orderBy + '/' + numPage + '/' + regxPage);
  }

  getTramiteById(idTr){
    return this.http.get(environment.URL_SERVICIOS+'/tramite/findById/' +idTr);
  }

  getTramiteLisVehPropById(idTr){
    return this.http.get(environment.URL_SERVICIOS+'/vehiculo/findAllPropVehByTramite/' +idTr);
  }

  createVehProp(form){
    return this.http.post(environment.URL_SERVICIOS+'/propietario/insertProVeh',form);
  }

  editVehProp(form){
    return this.http.post(environment.URL_SERVICIOS+'/propietario/updateProVeh',form);
  }

  deleteVehProp(form){
    return this.http.post(environment.URL_SERVICIOS+'/propietario/updateProVeh',form);
  }

  getProVehById(idPV){
    return this.http.get(environment.URL_SERVICIOS+'/propietario/findProVehById/' +idPV);
  }


  getPersonasByIdSucursal(idSucursal){
    return this.http.get(environment.URL_SERVICIOS+'/persona/findAllByCriterio/'+idSucursal+'/*/*/*/*/1/20');
  }

  getReporte(id,tipo,aux){
    window.open(environment.URL_REPORTE+'/ReporteServlet?id='+id+'&tipo='+tipo+'&aux='+aux)
  }

}
