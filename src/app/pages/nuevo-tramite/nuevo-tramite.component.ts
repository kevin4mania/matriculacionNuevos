import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UiServicesService, ServiciosService } from 'src/app/services/service.index';
import { trigger,state,style,transition,animate } from '@angular/animations';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

declare function validacionIdentificacion(identificacion);

@Component({
  selector: 'app-nuevo-tramite',
  templateUrl: './nuevo-tramite.component.html',
  styleUrls: ['./nuevo-tramite.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class NuevoTramiteComponent implements OnInit {
  displayDialog: boolean;
  cars: any[];
  newCar: boolean;
  idTramite;
  tramite = null;
  loading;
  formulario: FormGroup;
  formularioTramite: FormGroup;
  gestores;

  constructor(
    private activeRoute:ActivatedRoute,
    public _uiService: UiServicesService,
    public servicios: ServiciosService,
    public router: Router,
  ) {  
  }

  ngOnInit() {
    this.idTramite = this.activeRoute.snapshot.paramMap.get('id');
    this.obtenerTramite(this.idTramite);
    this.traerFormulario();
}

  obtenerTramite(idTramite){
    this._uiService.loadingCarga(true);
    this.servicios.getTramiteLisVehPropById(idTramite).subscribe((resp: any) => {
        if(resp.codRetorno=='0001')
        {
          this.tramite = resp.retorno.matFTR;
          this.getSucursalesByIdPersona(9);
          this.cars = resp.retorno.lstPropVeh;
          this._uiService.loadingCarga(false);
        }else{
          this._uiService.alertErrorMessage('No se pudieron recuperar los datos, intente nuevamente')
        }
    }, error => {
      this._uiService.alertErrorMessage('No se pudieron recuperar los datos, intente nuevamente')
    });
  }

  traerFormulario(){
    this.formulario = new FormGroup({
      matFPV:new FormGroup({
        tipoIden:new FormControl('1',Validators.required),
        idPV:new FormControl('0'),
        iden:new FormControl('',[Validators.required,this.validacionCedula.bind(this.formulario)]),
        nom:new FormControl('',Validators.required),
        ape: new FormControl('',Validators.required),
        rzSo:new FormControl(''),
        caPr:new FormControl('',Validators.required),
        caSe: new FormControl('',Validators.required),
        nmLt:new FormControl('',Validators.required),
        mail:new FormControl('',[Validators.required,Validators.email]),
        tlCv:new FormControl('',Validators.pattern("^[0-9]*$")),
        tlCl: new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
        usCr:new FormControl('dcorral'),
        esta:new FormControl('ACT'),
      }),
      matFVH:new FormGroup({
        idVH:new FormControl('0'),
        idTr:new FormControl(this.idTramite),
        idPv:new FormControl('0'),
        raDu:new FormControl('',Validators.required),
        grav:new FormControl('No'),
        obse:new FormControl(''),
        faDe:new FormControl(''),
        tipo:new FormControl('',Validators.required),
        usCr:new FormControl('dcorral'),
        esta:new FormControl('ACT'),
      }),
    })

    this.formularioTramite = new FormGroup({
        idTR:new FormControl(this.idTramite),
        idPc:new FormControl('',Validators.required),
        usCr:new FormControl('dcorral'),
        esta:new FormControl('CHG'),
    })
  }

  validacionCedula(control: FormControl) {
    const numeroIdentificacion: any = control.value;
    const result = validacionIdentificacion(numeroIdentificacion);
    if (result) {
        return null;
    }
    return {
        validacioncedula: true
    };
  }

  showDialogToAdd() {
    this.traerFormulario();
    this.displayDialog = true;
    this.newCar = true;
  }

  setTipoIdentificacion(tipoIden){
    if(tipoIden=='1'){
      this.formulario.controls.matFPV['controls'].nom.setValidators([
        Validators.required
      ]);
      this.formulario.controls.matFPV['controls'].ape.setValidators([
        Validators.required
      ]);
      this.formulario.controls.matFPV['controls'].rzSo.setValidators([]);
      this.formulario.controls.matFPV['controls'].rzSo.value = "";

      this.formulario.controls.matFPV['controls'].nom.updateValueAndValidity();
      this.formulario.controls.matFPV['controls'].ape.updateValueAndValidity();
      this.formulario.controls.matFPV['controls'].rzSo.updateValueAndValidity();
    }else{
      this.formulario.controls.matFPV['controls'].rzSo.setValidators([
        Validators.required
      ]);
      this.formulario.controls.matFPV['controls'].nom.setValidators([]);
      this.formulario.controls.matFPV['controls'].ape.setValidators([]);

      this.formulario.controls.matFPV['controls'].nom.value = "";
      this.formulario.controls.matFPV['controls'].ape.value = "";

      this.formulario.controls.matFPV['controls'].nom.updateValueAndValidity();
      this.formulario.controls.matFPV['controls'].ape.updateValueAndValidity();
      this.formulario.controls.matFPV['controls'].rzSo.updateValueAndValidity();
    }
  }

  

save() {
  this._uiService.loadingCarga(true);
  delete this.formulario.value.matFPV.tipoIden;
  this.servicios.createVehProp(this.formulario.value).subscribe((resp:any)=>{
    if(resp.codRetorno=='0001')
      {
        this.displayDialog = false;
        this._uiService.loadingCarga(false);
        this.obtenerTramite(this.idTramite);
        this.traerFormulario();
        this._uiService.alertConfirmMessage("Formulario ingresado correctamente")
      }
    else{
      this._uiService.alertErrorMessage('No se pudieron ingresar los datos, intente nuevamente')
    }  
  }, error => {
    this._uiService.alertErrorMessage('No se pudieron ingresar los datos, intente nuevamente')
  })
}

edit(){
    this._uiService.loadingCarga(true);
    delete this.formulario.value.matFPV.tipoIden;
    this.servicios.editVehProp(this.formulario.value).subscribe((resp:any)=>{
      if(resp.codRetorno=='0001')
        {
          this.displayDialog = false;
          this._uiService.loadingCarga(false);
          this.obtenerTramite(this.idTramite);
          this.traerFormulario();
          this._uiService.alertConfirmMessage("Formulario actualizado correctamente")
        }
      else{
        this._uiService.alertErrorMessage('No se pudieron ingresar los datos, intente nuevamente')
      }  
    }, error => {
      this._uiService.alertErrorMessage('No se pudieron ingresar los datos, intente nuevamente')
    })
}



delete() {
  this.formulario.value.matFPV.esta = 'INA';
  this.formulario.value.matFVH.esta = 'INA';
  delete this.formulario.value.matFPV.tipoIden;
  this.servicios.deleteVehProp(this.formulario.value).subscribe((resp:any)=>{
    if(resp.codRetorno=='0001')
      {
        this.displayDialog = false;
        this._uiService.loadingCarga(false);
        this.obtenerTramite(this.idTramite);
        this.traerFormulario();
        this._uiService.alertConfirmMessage("Vehículo y propietario eliminado correctamente")
      }
    else{
      this._uiService.alertErrorMessage('No se pudieron ingresar los datos, intente nuevamente')
    }  
  }, error => {
    this._uiService.alertErrorMessage('No se pudieron ingresar los datos, intente nuevamente')
  })
}

changeAFavDe(val){
  if(val=="Si"){
    this.formulario.controls.matFVH['controls'].faDe.setValidators([
      Validators.required
    ]);
    this.formulario.controls.matFVH['controls'].obse.setValidators([
      Validators.required
    ]);
    this.formulario.controls.matFVH['controls'].faDe.updateValueAndValidity();
    this.formulario.controls.matFVH['controls'].obse.updateValueAndValidity();
  }else{
    this.formulario.controls.matFVH['controls'].faDe.setValidators([]);
    this.formulario.controls.matFVH['controls'].obse.setValidators([]);
    this.formulario.controls.matFVH['controls'].faDe.updateValueAndValidity();
    this.formulario.controls.matFVH['controls'].obse.updateValueAndValidity();
  }
}

finalizarTramite(){

  if(this.formularioTramite.invalid){
    return;
  }

  Swal.fire({
    title: 'Se dara por finalizado el trámite actual',
    text: "Desea continuar?",
    type: 'info',
    showCancelButton: true,
    confirmButtonText: 'Finalizar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.value) {
      this._uiService.loadingCarga(true);
      this.servicios.finalizarTramite(this.formularioTramite.value).subscribe((resp:any)=>{
        if(resp.codRetorno=='0001'){
         // this.router.navigate(['/tramites'])
          this.obtenerTramite(this.idTramite);
          this._uiService.loadingCarga(false);
        }else{
          this._uiService.alertErrorMessage("Ocurrio un error, intente nuevamente");
        }
      },error=>{
        this._uiService.alertErrorMessage("Ocurrio un error, intente nuevamente");
      });
    }
  })
}


editarPropVeh(idPro){
  this.newCar = false;
  this._uiService.loadingCarga(true);
  this.servicios.getProVehById(idPro).subscribe((resp: any) => {
      if(resp.codRetorno=='0001')
      {
        let vehProp = resp.retorno;
        this.displayDialog = true;
        this._uiService.loadingCarga(false);
        this.formulario = new FormGroup({
          matFPV:new FormGroup({
            tipoIden:new FormControl(vehProp.matFPV.rzSo==""?'1':'2'),
            idPV:new FormControl(vehProp.matFPV.idPV),
            iden:new FormControl(vehProp.matFPV.iden,[Validators.required,this.validacionCedula.bind(this.formulario)]),
            nom:new FormControl(vehProp.matFPV.nom),
            ape: new FormControl(vehProp.matFPV.ape),
            rzSo:new FormControl(vehProp.matFPV.rzSo),
            caPr:new FormControl(vehProp.matFPV.caPr,Validators.required),
            caSe: new FormControl(vehProp.matFPV.caSe,Validators.required),
            nmLt:new FormControl(vehProp.matFPV.nmLt,Validators.required),
            mail:new FormControl(vehProp.matFPV.mail,[Validators.required,Validators.email]),
            tlCv:new FormControl(vehProp.matFPV.tlCv,Validators.pattern("^[0-9]*$")),
            tlCl: new FormControl(vehProp.matFPV.tlCl,[Validators.required,Validators.pattern("^[0-9]*$")]),
            usCr:new FormControl(vehProp.matFPV.usCr),
            esta:new FormControl(vehProp.matFPV.esta),
          }),
          matFVH:new FormGroup({
            idVH:new FormControl(vehProp.matFVH.idVH),
            idTr:new FormControl(this.idTramite),
            idPv:new FormControl(vehProp.matFVH.idPv),
            raDu:new FormControl(vehProp.matFVH.raDu,Validators.required),
            grav:new FormControl(vehProp.matFVH.grav),
            obse:new FormControl(vehProp.matFVH.obse),
            faDe:new FormControl(vehProp.matFVH.faDe),
            tipo:new FormControl(vehProp.matFVH.tipo,Validators.required),
            usCr:new FormControl(vehProp.matFVH.usCr),
            esta:new FormControl(vehProp.matFVH.esta),
          }),
        })

       
      }else{
        this._uiService.alertErrorMessage('No se pudieron recuperar los datos, intente nuevamente')
      }
  }, error => {
    this._uiService.alertErrorMessage('No se pudieron recuperar los datos, intente nuevamente')
  });
}

getErrorMessageCedula() {
  if (this.formulario.controls.matFPV['controls'].iden.hasError('required')) {
    return 'Cédula es un campo requerido';
  }

  return this.formulario.controls.matFPV['controls'].iden.hasError('validacioncedula') ? 'No es una cédula válida' : '';
}

getErrorMessageCorreo() {
  if (this.formulario.controls.matFPV['controls'].mail.hasError('required')) {
    return 'Correo es un campo requerido';
  }

  return this.formulario.controls.matFPV['controls'].mail.hasError('email') ? 'No es un correo válido' : '';
}

getSucursalesByIdPersona(idSucursal){
  this.servicios.getPersonasByIdSucursal(idSucursal).subscribe((resp:any)=>{
    if(resp.codRetorno=='0001')
      {
        this.gestores = resp.retorno;
        this.displayDialog = false;
        this._uiService.loadingCarga(false);
      }
    else{
      this._uiService.alertErrorMessage('No se pudieron ingresar los datos, intente nuevamente')
    }  
  }, error => {
    this._uiService.alertErrorMessage('No se pudieron ingresar los datos, intente nuevamente')
  })
}

generarSobre(){
  this.servicios.getReporte(this.idTramite,9,0);
}

generarListado(){
  this.servicios.getReporte(this.idTramite,8,0);
}

generarImpronta(id){
  this.servicios.getReporte(id,1,0);
}

generarCheckList(id,tipo){
  this.servicios.getReporte(id,tipo,0);
}

generarCertificadoRuc(id){
  this.servicios.getReporte(id,0,0);
}

}
