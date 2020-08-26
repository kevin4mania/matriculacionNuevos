import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UiServicesService } from '../services/servicios/ui-services.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: []
})
export class ForgotPasswordComponent implements OnInit {
  tokenFromUI: string = "0123456789123456";
  user:string;
  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    public _uiService: UiServicesService
    ) { }

  ngOnInit() {
  }


  recuperarPass(form: NgForm){

    if(form.invalid){
      return;
    }
 
    let user = form.value.user;
 

    Swal.fire({
      title: 'Enviando Correo',
      text: "Por Favor espere...",
      type: 'info',
      //showCloseButton: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        this._usuarioService.recuperarPass(29).subscribe((respuesta:any)=>{
          if(respuesta.codRetorno=='0001'){
            let mail = respuesta.retorno.mail;
            let nombres = respuesta.retorno.nom +' '+respuesta.retorno.ape;

            let idUsuario = respuesta.retorno.idPC;
            var b64 = CryptoJS.AES.encrypt(idUsuario.toString(), this.tokenFromUI).toString();
            var e64 = CryptoJS.enc.Base64.parse(b64);
            var encriptado = e64.toString(CryptoJS.enc.Hex);
            let url = "http://localhost:4200/#/changePassword/"+encriptado;
            //let url = "http://servicios.amt.gob.ec/web/test/matriculacionNuevos/#/changePassword/"+encriptado;
            
            this._uiService.enviarCorreo(mail,'Para restablecer su contraseña, ingrese al siguiente link <br> <a href="'+url+'">'+url+'</a>', nombres).subscribe((resp:any)=>{
              let totalLetrasMail = mail.indexOf("@")-2;
              let mailProtegido = mail.replace(mail.substring(1,totalLetrasMail), '*'.repeat(totalLetrasMail-1));
                Swal.fire({
                  title: 'Correo Enviado Exitosamente',
                  text: 'Se envió un correo electrónico a '+mailProtegido+' para el cambio de contraseña',
                  type: 'success',
                })
                this.router.navigate(['/login'])
            },error=>{
              this.alertCorreoError();
              this.user = "";
            })
          }else{
            this.alertUserError();
            this.user = "";
          }
        },error => {
          this.alertUserError();
          this.user = "";
      });
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
 
   }

   alertUserError(){
    Swal.fire({
      text: 'No se encuentra el usuario, intente nuevamente',
      type: 'error',
      confirmButtonText: 'Aceptar'
    })
   }

   alertCorreoError(){
    Swal.fire({
      text: 'El correo electrónico no es correcto, intente nuevamente',
      type: 'error',
      confirmButtonText: 'Aceptar'
    })
   }
}
