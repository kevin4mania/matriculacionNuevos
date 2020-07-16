import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UiServicesService {

  // Idioma Calendario Ng Prime
  idiomaCalendario: any;

  constructor(
    private http:HttpClient,
    private toastr: ToastrService
  ) { 
    this.setIdiomaCalendario();
  }

  totalPaginas(totalRegistros, rango){
    let totalPaginas = Math.trunc((totalRegistros)/rango);
    if(parseInt(totalRegistros) > rango){
      let residuo  = (totalRegistros)%rango;
      if(residuo > 0){
        totalPaginas = (totalPaginas+1);
      }
      return totalPaginas
    }else{
      totalPaginas = 1;
      return totalPaginas;
    }
   }

   alertConfirmMessage(message) {
    this.toastr.success(message);
  }


   alertErrorMessage(message){
    Swal.fire({
      title: 'Error!',
      text: message,
      type: 'error',
      confirmButtonText: 'Aceptar'
    })
   }



  enviarCorreo(mail:string,text:string, nombres:string) {

    let dataMail:FormData = new FormData();
    dataMail.append('to', mail)
    dataMail.append('subject', 'Recuperación de contraseña del sistema de control de asistencia AMT')
    dataMail.append('text', text)
    dataMail.append('param1', nombres)
    dataMail.append('param2', '')
    dataMail.append('param3', '')
    dataMail.append('param4', '')
    dataMail.append('param5', '')
    dataMail.append('tipo', '5')

    return this.http.post(environment.URL_SERVICIOS_CORREO,dataMail);
  }

  loadingCarga(value){
    if(value){
      Swal.fire({
        title: 'Cargando Datos',
        text: "Por Favor espere...",
        type: 'info',
        //showCloseButton: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
      return true;
    }else{
      Swal.close();
      return false;
    }
  }

  setIdiomaCalendario(){
    this.idiomaCalendario = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
    };
  }

}
