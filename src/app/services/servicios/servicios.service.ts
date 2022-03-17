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

  getTramitesNEQ(idPc,nmTr,codEst,usCr,orderBy,numPage,regxPage){
    return this.http.get(environment.URL_SERVICIOS+'/tramite/findAllByCriterio_NEQ/' + idPc + '/' + nmTr+ '/' + codEst + '/'+usCr+'/'+ orderBy + '/' + numPage + '/' + regxPage);
  }

  getTramiteById(idTr){
    return this.http.get(environment.URL_SERVICIOS+'/tramite/findById/' +idTr);
  }

  getTramiteLisVehPropById(idTr){
    return this.http.get(environment.URL_SERVICIOS+'/vehiculo/findAllPropVehByTramite/' +idTr);
  }

  getVehiculoByCriterio(idTr,idPv,raDu,codEst,orderBy,numPage,regxPage){
    return this.http.get(environment.URL_SERVICIOS+'/vehiculo/findAllByCriterio/'+idTr+'/'+idPv+'/'+raDu+'/'+codEst+'/'+orderBy+'/'+numPage+'/'+regxPage);
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
    return this.http.get(environment.URL_SERVICIOS+'/persona/findAllByIdScAndFeCd/'+idSucursal+'/ACT');
  }

  getPersonasByIdConsesionario(idConsesionario){
    return this.http.get(environment.URL_SERVICIOS+'/concesionario/findAllPerUsrByConcesionario/'+idConsesionario);
  }

  getReporte(id,tipo,aux){
    window.open(environment.URL_REPORTE+'/ReporteServlet?id='+id+'&tipo='+tipo+'&aux='+aux)
  }
  /**
   * Nuevos servicios para traer los dicumentos a vistaDocumentos
   */
   getAnexos(idTabla,tipo){
    return this.http.get(environment.URL_SERVICIOS_DOCUMENTOS+'/documentos/findByIdTablaAndTipo/'+idTabla+'/'+tipo);
  }

  subirArchivos(archivos){
    return this.http.post(environment.URL_SERVICIOS_DOCUMENTOS+'/documentos/save',archivos);
  }

  deleteArchivo(idDocumento){
    // console.log(environment.URL_SERVICIOS_DOCUMENTOS+'/documentos/delete',idDocumento+'/usr');
    return this.http.get(`${environment.URL_SERVICIOS_DOCUMENTOS}/documentos/delete/${idDocumento}/WEB`);
  }


}
