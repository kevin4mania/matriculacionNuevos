import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService, UiServicesService } from '../services/service.index';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  idUsuario;
  tokenFromUI: string = "0123456789123456";
  decrypted: string;
  constructor(
    public _usuarioService: UsuarioService,
    private activeRoute:ActivatedRoute,
    public router: Router,
    public _uiService: UiServicesService,
    ) { }

  ngOnInit() {
    var reb64 = CryptoJS.enc.Hex.parse(this.activeRoute.snapshot.paramMap.get('id'));
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, this.tokenFromUI);
    this.idUsuario = decrypt.toString(CryptoJS.enc.Utf8);
      
    this.passwordForm = new FormGroup({
      passwordNew: new FormControl('', Validators.required ),
      passwordConfirm: new FormControl('', Validators.required)
    },{validators: this.sonIguales('passwordNew','passwordConfirm')});
  }

  sonIguales(campo1:string, campo2: string){
    return (group: FormGroup)=>{
     let passNew = group.controls[campo1].value;
     let passConfirm = group.controls[campo2].value;

     if(passNew === passConfirm){
       return null;
     }

     return{
        sonIguales:true
      };

    };
 }


  updatePassword(){
    if(this.passwordForm.invalid){
      return;
    }

    Swal.fire({
      title: 'Importante!',
      text: 'Esta seguro de actualizar su contraseña?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Actualizar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._uiService.loadingCarga(true);
        this._usuarioService.newPassword(this.passwordForm.value,this.idUsuario).subscribe((resp:any)=>{
          if(resp.codRetorno=='0001'){
            this.passwordForm.reset();
            Swal.fire(
              'Actualizado!',
              'Sus Datos fueron actualizados correctamente',
              'success'
            )
            this.router.navigate(['/login'])
          }else{
            Swal.fire(
              'Error!',
              resp.retorno,
              'error'
            )
          }
        },error=>{
          Swal.fire(
            'Error!',
            'Ocurrio un error vuelva a intentarlo',
            'error'
          )
        })
      }
    });
   }

}
