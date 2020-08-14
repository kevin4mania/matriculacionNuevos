import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { UiServicesService } from '../servicios/ui-services.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: string;
  persona;
  sucursal;
  consecionario;
  asistente;
  keyApp = '_mnuevos'

  constructor(
    private http:HttpClient,
    public router: Router,
    private _uiService:UiServicesService,
    ) {
   this.cargarStorage();
   }

  cargarStorage() {
    if (localStorage.getItem('login'+this.keyApp)) {
      this.usuario = localStorage.getItem('login'+this.keyApp);
      this.asistente = JSON.parse( localStorage.getItem('asistente'+this.keyApp));
      this.persona = JSON.parse( localStorage.getItem('persona'+this.keyApp));
      this.sucursal = JSON.parse( localStorage.getItem('sucursal'+this.keyApp));
      this.consecionario = JSON.parse( localStorage.getItem('consecionario'+this.keyApp));
    } else {
      this.usuario = "";
      this.asistente = [];
      this.persona = [];
      this.sucursal = [];
      this.consecionario = [];
    }
  }

  logout() {
    this.asistente = [];
    this.usuario = "";
    this.persona = [];
    this.sucursal = [];
    this.consecionario = [];

    localStorage.removeItem('asistente'+this.keyApp);
    localStorage.removeItem('persona'+this.keyApp);
    localStorage.removeItem('sucursal'+this.keyApp);
    localStorage.removeItem('consecionario'+this.keyApp);
    localStorage.removeItem('login'+this.keyApp);
    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recordar: boolean = false){
    this.recordarUser(recordar,usuario);
    let url = environment.URL_SERVICIOS + '/usuario/login/';
    return this.http.get(url+usuario.usuario+"/"+usuario.password)
    .map((respLogin:any)=>{
      if(respLogin.codRetorno == '0001'){
        let respuestaLogin = respLogin.retorno;
        this.guardarStorage(respuestaLogin.matFUC,respuestaLogin.matFPC,respuestaLogin.matFSC,respuestaLogin.matFCN);
        return true;
      }else{
        this._uiService.alertErrorMessage('Usuario y/o contraseña inválidos');
        return false;
      }
    }).catch(err=>{
        this._uiService.alertErrorMessage(err.error.message);
        return throwError(err);
    });
  }

  recordarUser(recordar:boolean,usuario){
    if(recordar){
      localStorage.setItem('usuario'+this.keyApp,usuario.usuario)
    }else{
      localStorage.removeItem('usuario'+this.keyApp);
    }
  }

  guardarStorage( usuario,persona,sucursal,consecionario) {
    localStorage.setItem('asistente'+this.keyApp, JSON.stringify(usuario) );
    localStorage.setItem('persona'+this.keyApp, JSON.stringify(persona) );
    localStorage.setItem('sucursal'+this.keyApp, JSON.stringify(sucursal) );
    localStorage.setItem('consecionario'+this.keyApp, JSON.stringify(consecionario) );
    localStorage.setItem('login'+this.keyApp,  usuario['logi']);

    this.asistente = usuario;
    this.persona = persona;
    this.sucursal = sucursal;
    this.consecionario = consecionario;
    this.usuario= usuario['logi'];
  }

  estaLogueado(){
    return (this.usuario.length>1)? true:false;
  }

  cambiarPassword(formPassword){
    let form = {
      'login':this.usuario,
      'oldPassword':formPassword.passwordOld,
      'newPassword':formPassword.passwordNew
    }
    return this.http.post(environment.URL_SERVICIOS_SEGURIDAD+'/updatePassword',form)
  }

  newPassword(formPassword,idUsuario){
    let form = {
      'codigo':idUsuario,
      'valor':formPassword.passwordNew,
      "aux1": "",
      "aux2": "",
    }
    return this.http.post(environment.URL_SERVICIOS_SEGURIDAD+'/updatePassForgot',form)
  }

  getPersona(idPersona){
    return this.http.get(environment.URL_SERVICIOS+'/persona/findById/'+idPersona)
  }

  updateUser(formUser){
    return this.http.post(environment.URL_SERVICIOS + '/persona/update',formUser)
  }

  recuperarPass(user){
    return this.http.get(environment.URL_SERVICIOS_SEGURIDAD+'/forgotPassword/'+user+'/'+environment.idAplicacion)
  }



}
