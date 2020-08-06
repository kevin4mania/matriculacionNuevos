import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UiServicesService, ServiciosService } from 'src/app/services/service.index';

@Component({
  selector: 'app-nuevo-tramite',
  templateUrl: './nuevo-tramite.component.html',
  styleUrls: ['./nuevo-tramite.component.scss']
})
export class NuevoTramiteComponent implements OnInit {

  displayDialog: boolean;
  car = {};
  selectedCar;
  newCar: boolean;
  cars: any[];
  cols: any[];
  idTramite;
  tramite = null;
  constructor(
    private activeRoute:ActivatedRoute,
    public _uiService: UiServicesService,
    public servicios: ServiciosService,
  ) {  
  }

  ngOnInit() {
    this.idTramite = this.activeRoute.snapshot.paramMap.get('id');
    this.obtenerTramite(this.idTramite);
    this.cols = [
     // { field: 'item', header: 'Item' },
      { field: 'raDu', header: 'RAMV/DUI' },
      { field: 'grav', header: 'Gravamen' },
      { field: 'iden', header: 'Identificación' },
      { field: 'nom', header: 'Nombres' },
      { field: 'ape', header: 'Apellidos' },
      { field: 'faDe', header: 'A favor de' },
  ];

  }

  obtenerTramite(idTramite){
    this._uiService.loadingCarga(true);
    this.servicios.getTramiteLisVehPropById(idTramite).subscribe((resp: any) => {
        if(resp.codRetorno=='0001')
        {
          this.tramite = resp.retorno.matFTR;
          this._uiService.loadingCarga(false);
        }else{
          this._uiService.alertErrorMessage('No se pudieron recuperar los datos, intente nuevamente')
        }
    }, error => {
      this._uiService.alertErrorMessage('No se pudieron recuperar los datos, intente nuevamente')
    });
  }


  showDialogToAdd() {
    this.newCar = true;
    this.car = {};
    this.displayDialog = true;
  }


save() {
  let cars = [];

  if (this.newCar){
      cars.push(this.car);
  }
  else
      cars[this.cars.indexOf(this.selectedCar)] = this.car;

  this.cars = cars;
  console.log(this.cars)
  this.car = null;
  this.displayDialog = false;
}

delete() {

}

onRowSelect(event) {
  this.newCar = false;
  this.car = this.cloneCar(event.data);
  console.log(this.car);
  this.displayDialog = true;
}

cloneCar(c) {
  let car = {};
  for (let prop in c) {
      car[prop] = c[prop];
  }
  return car;
}

}
