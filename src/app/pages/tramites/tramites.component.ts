import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginatorIntl} from '@angular/material';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.scss'],
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  tramites: any[];

  loading = false;

  constructor() { 
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
    
  }

  redirectToSobre = (id: string) => {
    
  }

  redirectToDetails = (id: string) => {
    
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