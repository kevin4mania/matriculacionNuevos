import { Component, OnInit } from '@angular/core';
import { FormGroup,  Validators, FormControl } from '@angular/forms';
import { UsuarioService, UiServicesService } from '../../services/service.index';

import Swal from 'sweetalert2'
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {
  userForm: FormGroup;
  passwordForm: FormGroup;
  imagenSubir: File;
  imagenTemp;
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
      idUC: new FormControl(this._usuarioService.asistente['idUC']),
      login: new FormControl(this._usuarioService.usuario),
      oldPwd: new FormControl('', Validators.required ),
      newPwd: new FormControl('', Validators.required ),
      passwordConfirm: new FormControl('', Validators.required),
    },{validators: this.sonIguales('newPwd','passwordConfirm')});

    this.obtenerPersona();
  }

  obtenerPersona(){
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
    console.log("aqui");
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
          this.obtenerPersona();
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
        delete this.passwordForm.value.passwordConfirm;
        this._uiService.loadingCarga(true);
        this._usuarioService.cambiarPassword(this.passwordForm.value).subscribe((resp:any)=>{
          if(resp.codRetorno=='0001'){
            this.passwordForm.reset();
            this._uiService.loadingCarga(false);
            this._uiService.alertConfirmMessage("Datos actualizados correctamente")
          }else{
            this._uiService.alertErrorMessage(resp.retorno)
          }
        },error=>{
          this._uiService.alertErrorMessage("Ocurrio un error, intente nuevamente");
        })
      } 
    });
   }

   async seleccionImage(archivo: File){
    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      this._uiService.alertErrorMessage('El formato de imagen no es correcto');
      this.imagenSubir = null;
      return;
    }

    if(archivo.size > 357336 ){
      this._uiService.alertErrorMessage('La imagen no puede superar los 350kb');
      this.imagenSubir = null;
      return;
    }

    this._uiService.loadingCarga(true);
    this.imagenSubir = archivo;
    const reader = new FileReader();

    const urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result;

    
    this._usuarioService.subirImagenFTPPerfil(this.imagenSubir,this.persona.iden).subscribe((data:any)=>{
      if(data.codRetorno=="0001"){
        console.log(data);
        this._uiService.loadingCarga(false);
        this.imagenTemp = "";
        this.userForm.get('foto').setValue(environment.URL_SERVIDOR_PHOTOS+'US/Matriculacion_Nuevos/persona/'+this.persona.iden+'/'+archivo.name)
        this.updateUser();

      }else{
        this._uiService.alertErrorMessage('Ocurrio un error al subir la imagen');
        this.imagenTemp = "";
      }
      }, error=>{
        this._uiService.alertErrorMessage('Ocurrio un error al subir la imagen');
        this.imagenTemp = "";
      });
         
    }
}
