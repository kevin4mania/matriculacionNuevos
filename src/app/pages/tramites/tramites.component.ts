import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginatorIntl} from '@angular/material';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import { UiServicesService, ServiciosService,UsuarioService } from 'src/app/services/service.index';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class TramitesComponent extends MatPaginatorIntl implements OnInit, AfterViewInit  {
  tokenFromUI: string = "0123456789123456";
  itemsPerPageLabel = 'Items por página'; 
  nextPageLabel  = 'Página Siguiente'; 
  firstPageLabel = 'Primera Página';
  lastPageLabel = 'Última Página'
  previousPageLabel = 'Página Anterior'; 
  
  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  };

  displayedColumns: string[] = ['nmTr','nmVh','esta','details'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  tramites: any[];
  numTramites;
  loading = false;

  userInfo;

  constructor(
    public router: Router,
    private _snackBar: MatSnackBar,
    public _uiService: UiServicesService,
    public servicios: ServiciosService,
    public usuario:UsuarioService,
  ) { 
    super();
  }

  ngOnInit() {
    this.userInfo = this.usuario.asistente;
    this.obtenerTramites();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  obtenerTramites(){
    this._uiService.loadingCarga(true);
    this.servicios.getTramites('*', '*', '*',this.usuario.usuario,'*', 1, 9999).subscribe((resp: any) => {
      if (resp.codRetorno == '0001') {
        this.tramites = resp.retorno;
        this.numTramites = resp.countRegistros;
        this._uiService.loadingCarga(false);
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.tramites)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this._uiService.alertErrorMessage('No se pudieron ingresar los datos, intente nuevamente')
      }
    }, error => {
      this._uiService.alertErrorMessage('No se pudieron ingresar los datos, intente nuevamente')
    });
  }

  redirectToDelete = (id: string) => {
    this.servicios.deleteTramite(id,this.usuario.usuario).subscribe((resp:any)=>{
      if(resp.codRetorno=='0001'){
        let snackBarRef = this._snackBar.open('Trámite eliminado', 'Deshacer', {
          duration: 7000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass:['customClass']
        });
        this.obtenerTramites();
    
        snackBarRef.onAction().subscribe(() => {
          this.recuperarTramite(id);
        });
        this._uiService.loadingCarga(false);
      }else{
        this._uiService.alertErrorMessage("Ocurrio un error, intente nuevamente");
      }
    },error=>{
      this._uiService.alertErrorMessage("Ocurrio un error, intente nuevamente");
    });
  }

  recuperarTramite(id){
    this.servicios.recuperarTramite(id,this.usuario.usuario).subscribe((resp:any)=>{
      if(resp.codRetorno=='0001'){
        this.obtenerTramites();
        this._uiService.loadingCarga(false);
      }else{
        this._uiService.alertErrorMessage("Ocurrio un error, intente nuevamente");
      }
    },error=>{
      this._uiService.alertErrorMessage("Ocurrio un error, intente nuevamente");
    });
  }

  redirectToSobre = (id: string) => {
    this.servicios.getReporte(id,9,0);
  }

  redirectToListado = (id: string) => {
    this.servicios.getReporte(id,8,0);
  }

  redirectToDetails = (id: string) => {
    var b64 = CryptoJS.AES.encrypt(id.toString(), this.tokenFromUI).toString();
    var e64 = CryptoJS.enc.Base64.parse(b64);
    var encriptado = e64.toString(CryptoJS.enc.Hex);
    this.router.navigate(['/tramite/'+encriptado])
  }

  redirectToNewTramite = () => {
    Swal.fire({
      title: 'Se asignara un código al crear un trámite',
      text: "Desea continuar?",
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._uiService.loadingCarga(true);
        let formTramite = {
          'idTR':'0',
          'idPc':this.userInfo['idPc'],
          'nmTr':'',
          'usCr':this.usuario.usuario,
          'esta':'GEN',
        }
        this.servicios.createTramite(formTramite).subscribe((resp:any)=>{
          if(resp.codRetorno=='0001'){
            var b64 = CryptoJS.AES.encrypt(resp.retorno.toString(), this.tokenFromUI).toString();
            var e64 = CryptoJS.enc.Base64.parse(b64);
            var encriptado = e64.toString(CryptoJS.enc.Hex);
            this.router.navigate(['/tramite/'+encriptado])
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

}

export interface PeriodicElement {
  name: string;
  position: string;
  weight: number;
  symbol: string;
}

