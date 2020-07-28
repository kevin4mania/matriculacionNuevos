import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginatorIntl} from '@angular/material';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import { UiServicesService, ServiciosService } from 'src/app/services/service.index';


@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class TramitesComponent extends MatPaginatorIntl implements OnInit, AfterViewInit  {
  
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

  displayedColumns: string[] = ['position', 'name','details'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  tramites: any[];
  loading = false;

  constructor(
    public router: Router,
    private _snackBar: MatSnackBar,
    public _uiService: UiServicesService,
    public servicios: ServiciosService,
  ) { 
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  redirectToDelete = (id: string) => {
    let snackBarRef = this._snackBar.open('Trámite eliminado', 'Deshacer', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass:['customClass']
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('The snack-bar action was triggered!');
    });
    
  }

  redirectToSobre = (id: string) => {
    
  }

  redirectToDetails = (id: string) => {
    
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
          'idPc':'1',
          'nmTr':'',
          'usCr':'DCORRAL',
          'esta':'GEN',
        }
        this.servicios.createTramite(formTramite).subscribe((resp:any)=>{
          console.log(resp);
          if(resp.codRetorno=='0001'){
            this.router.navigate(['/nuevoTramite'])
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

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'AMT_MAT_KIA_DC_001', name: 'Iniciado', weight: 1.0079, symbol: 'H'},
  {position: 'AMT_MAT_KIA_DC_002', name: 'En Proceso', weight: 4.0026, symbol: 'He'},
  {position: 'AMT_MAT_KIA_DC_003', name: 'Finalizado', weight: 6.941, symbol: 'Li'},
  {position: 'AMT_MAT_KIA_DC_004', name: 'Finalizado', weight: 9.0122, symbol: 'Be'},
  {position: 'AMT_MAT_KIA_DC_005', name: 'Finalizado', weight: 10.811, symbol: 'B'},
  {position: 'AMT_MAT_KIA_DC_006', name: 'Finalizado', weight: 12.0107, symbol: 'C'},
  {position: 'AMT_MAT_KIA_DC_007', name: 'Finalizado', weight: 14.0067, symbol: 'N'},
  {position: 'AMT_MAT_KIA_DC_008', name: 'Finalizado', weight: 15.9994, symbol: 'O'},
  {position: 'AMT_MAT_KIA_DC_009', name: 'Finalizado', weight: 18.9984, symbol: 'F'},
  {position: 'AMT_MAT_KIA_DC_010', name: 'Finalizado', weight: 20.1797, symbol: 'Ne'},
];