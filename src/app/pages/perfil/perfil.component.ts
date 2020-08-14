import { Component, OnInit } from '@angular/core';
import { FormGroup,  Validators, FormControl } from '@angular/forms';
import { UsuarioService, UiServicesService } from '../../services/service.index';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {
  userForm: FormGroup;
  passwordForm: FormGroup;

  persona:any=null;

  constructor(
    public _usuarioService: UsuarioService,
    public _uiService: UiServicesService
    ) { }


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


  ngOnInit() {
    this.userForm = new FormGroup({
      idPC: new FormControl(''),
      idSc: new FormControl(''),
      iden: new FormControl(''),
      nom: new FormControl(''),
      ape: new FormControl(''),
      feCd: new FormControl(''),
      mail: new FormControl('', [Validators.required, Validators.email]),
      tlCv: new FormControl(''),
      dire: new FormControl(''),
      foto: new FormControl(''),
    });

    this.passwordForm = new FormGroup({
      passwordOld: new FormControl('', Validators.required ),
      passwordNew: new FormControl('', Validators.required ),
      passwordConfirm: new FormControl('', Validators.required)
    },{validators: this.sonIguales('passwordNew','passwordConfirm')});

    this._uiService.loadingCarga(true);
    this._usuarioService.getPersona(this._usuarioService.persona['idPC']).subscribe((resp:any)=>{
      if(resp.codRetorno == '0001'){
        this._uiService.loadingCarga(false);
        this.persona = resp.retorno;
        this.userForm.get('idPC').setValue(this.persona.idPC)
        this.userForm.get('idSc').setValue(this.persona.idSc)
        this.userForm.get('iden').setValue(this.persona.iden)
        this.userForm.get('nom').setValue(this.persona.nom)
        this.userForm.get('ape').setValue(this.persona.ape)
        this.userForm.get('feCd').setValue(this.persona.feCd)
        this.userForm.get('mail').setValue(this.persona.mail)
        this.userForm.get('tlCv').setValue(this.persona.tlCv)
        this.userForm.get('dire').setValue(this.persona.dire)
        this.userForm.get('foto').setValue(this.persona.foto)
      }else{
        this._uiService.alertErrorMessage("Ocurrio un error, intente nuevamente");
      }
    },error=>{
      this._uiService.alertErrorMessage("Ocurrio un error, intente nuevamente");
    })
  }

  updateUser(){

    if(this.userForm.invalid){
      return;
    }

   Swal.fire({
    title: 'Importante!',
    text: 'Esta seguro de actualizar sus datos?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, Actualizar!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.value) {
      this._uiService.loadingCarga(true);
      this._usuarioService.updateUser(this.userForm.value).subscribe((resp:any)=>{
        if(resp.codRetorno == '0001'){
          this._uiService.loadingCarga(false);
          this._uiService.alertConfirmMessage("Datos actualizados correctamente")
        }else{
          this._uiService.alertErrorMessage("Ocurrio un error, intente nuevamente");
        }
      },error=>{
        this._uiService.alertErrorMessage("Ocurrio un error, intente nuevamente");
      })
    }
  });
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
        this._usuarioService.cambiarPassword(this.passwordForm.value).subscribe((resp:any)=>{
          if(resp.codRetorno=='0001'){
            this.passwordForm.reset();
            Swal.fire(
              'Actualizado!',
              'Sus Datos fueron actualizados correctamente',
              'success'
            )
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Acción Cancelada',
          '',
          'error'
        )
      }
    });
   }

}
