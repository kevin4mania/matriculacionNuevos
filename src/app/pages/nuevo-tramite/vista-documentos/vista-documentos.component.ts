import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { ServiciosService } from "../../../services/servicios/servicios.service";
import Swal from "sweetalert2";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-vista-documentos",
  templateUrl: "./vista-documentos.component.html",
  styleUrls: ["./vista-documentos.component.css"],
})
export class VistaDocumentosComponent implements OnInit {
  isArchivoCargado: boolean = false;
  nombreTablaEnviar: string = "MatriculacionNuevo";
  tempFiles = [];
  tempFilesServ = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: ServiciosService
  ) {}

  ngOnInit() {
    // console.log("Data vistaDOC: " + this.data);
    this.cargarDocumentos();
    // console.log("IDU: ", this.data.matFVH.raDu);
    // console.log("CEDULA: ", this.data.matFPV.iden);
    // console.log("ID: ", this.data.matFVH.raDu + this.data.matFPV.iden);
  }

  cargarDocumentos() {
    this.service
      .getAnexos(
        this.data.matFVH.raDu + this.data.matFPV.iden,
        this.nombreTablaEnviar
      )
      .subscribe((resp: any) => {
        if (resp.codRetorno == "0001" && resp.countRegistros > 0) {
          //console.log("Respuesta servidor: ", resp.retorno.lstBase64);
          this.tempFilesServ = resp.retorno.lstBase64;
        } else {
          this.tempFilesServ = [];
        }
      });
  }
  /**
   *
   */
  crearBase64(archivo, i) {
    let reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = (e) => {
      this.tempFilesServ.push({
        nivel: ++i,
        tipo: this.nombreTablaEnviar,
        base64: reader.result,
        nombreDocumento: archivo.name,
      });
      this.tempFiles.push({
        nivel: ++i,
        tipo: this.nombreTablaEnviar,
        base64: reader.result,
        nombreDocumento: archivo.name,
      });
    };
    reader.onerror = function (error) {};
  }

  seleccionarArchivo(archivos: File[]) {
    this.tempFiles=[]
    this.isArchivoCargado = true;
    // console.log("vector de archivos:", archivos.length);
    if (!archivos) {
      this.tempFilesServ = null;
      return;
    }

    for (let i = 0; i < archivos.length; i++) {
      // console.log(archivos[i].name);
      if (archivos[i].size > 2000000) {
        this.alertErrorMeesage(
          `El tamaño del archivo ${archivos[i].name} supera los 2MB`,
          "Revise los archivos subidos y vuelva a enviar"
        );
        continue;
      }
      this.crearBase64(archivos[i], i);
    }
  }

  subirArchivos() {
    let formFiles = {
      idTabla: this.data.matFVH.raDu + this.data.matFPV.iden,
      nombreTabla: environment.FILES_NOMBRE_TABLA,
      nombreEsquema: environment.FILES_NOMBRE_ESQUEMA,
      usuario: "WEB",
      lstBase64: this.tempFiles,
    };

    //console.log("FORMULARIOS VAN AL SERV: ", formFiles);

    this.service.subirArchivos(formFiles).subscribe(
      (resp: any) => {
        if (resp.codRetorno == "0001") {
          Swal.fire({
            title: "Formulario enviado correctamente",
            text: "Cualquier notificación sera enviada a su correo electrónico",
            type: "success",
            confirmButtonText: "Aceptar",
          });
        } else {
          this.alertErrorMeesage(
            "Ocurrio un error al subir los archivos",
            "Revise los archivos subidos y vuelva a enviar"
          );
        }
      },
      (error) => {
        this.alertErrorMeesage(
          "Ocurrio un error al subir los archivos",
          "Revise los archivos subidos y vuelva a enviar"
        );
      }
    );
  }

  alertErrorMeesage(titulo, texto) {
    Swal.fire({
      title: titulo,
      text: texto,
      type: "error",
      confirmButtonText: "Aceptar",
    });
  }

  eliminarArchivo(event, i, idDoc) {
    // console.log("Index : ", i);
    // console.log("idDoc : ", idDoc);
    // console.log(this.tempFilesServ);
    event.preventDefault();
    this.service.deleteArchivo(idDoc).subscribe((res: any) => {
      if (res.retorno) {
        this.tempFilesServ.splice(i, 1);
      } else {
        this.alertErrorMeesage("Ocurrio un error al borrar archivo", "");
      }
    });
    // 1 es la cantidad de elemento a eliminar
  }

  downloadPdf(base64String, fileName) {
    const source = `${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }
}
