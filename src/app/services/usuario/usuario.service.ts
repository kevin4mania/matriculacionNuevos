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
  rol: string;
  usuario: string;
  menu: any[] = [];
  persona: {};
  keyApp = '_'+environment.nombreAplicaion + '_' + parseInt(environment.idAplicacion);

  constructor(
    private http:HttpClient,
    public router: Router,
    private _uiService:UiServicesService,
    ) {
   this.cargarStorage();
   }

  cargarStorage() {
    if ( JSON.parse(localStorage.getItem('key'+this.keyApp)) == this.keyApp && localStorage.getItem('login'+this.keyApp)) {
      this.usuario = localStorage.getItem('login'+this.keyApp);
      this.menu = JSON.parse( localStorage.getItem('menu'+this.keyApp));
      this.rol = localStorage.getItem('rol'+this.keyApp);
      this.persona = JSON.parse( localStorage.getItem('persona'+this.keyApp));
    } else {
      this.usuario = "";
      this.menu = [];
      this.rol="";
      this.persona = [];
    }
  }

  logout() {
    this.usuario = "";
    this.menu = [];
    this.rol = "";
    this.persona = [];
    
    localStorage.removeItem('login'+this.keyApp);
    localStorage.removeItem('menu'+this.keyApp);
    localStorage.removeItem('rol'+this.keyApp);
    localStorage.removeItem('key'+this.keyApp);
    localStorage.removeItem('persona'+this.keyApp);
    
    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recordar: boolean = false){
    this.recordarUser(recordar,usuario);
    let url = environment.URL_SERVICIOS_SEGURIDAD + '/login/';
    return this.http.get(url+usuario.usuario.toUpperCase()+"/"+usuario.password+"/"+environment.idAplicacion)
    .map((respLogin:any)=>{
      if(respLogin.codRetorno == '0001'){
        let respuestaLogin = respLogin.retorno;
        this.guardarStorage(respuestaLogin.usuario.usuario, respuestaLogin.lsMenu, respuestaLogin.perfil.nombrePerfil, respuestaLogin.cabeceraPersona);
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

  guardarStorage( usuario:string, menu:any, rol:string, persona:any ) {
    localStorage.setItem('key'+this.keyApp, JSON.stringify(this.keyApp));
    localStorage.setItem('login'+this.keyApp, usuario);
    localStorage.setItem('menu'+this.keyApp, JSON.stringify(menu));
    localStorage.setItem('rol'+this.keyApp, rol);
    localStorage.setItem('persona'+this.keyApp, JSON.stringify(persona) );

    this.usuario = usuario;
    this.menu = menu;
    this.rol = rol;
    this.persona = persona;
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

  getPersona(){
    return this.http.get(environment.URL_SERVICIOS_SEGURIDAD+'/perfil/'+this.usuario+'/'+environment.idAplicacion)
  }

  updateUser(formUser,persona){
    let form = {
      'secuenciaCabeceraPersona': persona.cabeceraPersona.secuenciaCabeceraPersona,
      'telefonoCelular':formUser.contacto,
      'direccionDomicilio': formUser.direccion,
      'detalleCabeceraPersona':{
        'secuenciaDetallePersona': persona.cabeceraPersona.detalleCabeceraPersona.secuenciaDetallePersona,
        'mailPersonal':formUser.correo
      }
    }
    return this.http.post(environment.URL_SERVICIOS_SEGURIDAD+'/updateCabeceraPersona',form)
  }

  recuperarPass(user){
    return this.http.get(environment.URL_SERVICIOS_SEGURIDAD+'/forgotPassword/'+user+'/'+environment.idAplicacion)
  }



}
