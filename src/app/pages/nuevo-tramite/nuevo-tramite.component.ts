import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-tramite',
  templateUrl: './nuevo-tramite.component.html',
  styleUrls: ['./nuevo-tramite.component.css']
})
export class NuevoTramiteComponent implements OnInit {

  displayDialog: boolean;

  car: Car = {};

  selectedCar;

  newCar: boolean;

  cars: Car[];

  cols: any[];

  constructor() { }

  ngOnInit() {
    this.cols = [
     // { field: 'item', header: 'Item' },
      { field: 'ramv', header: 'RAMV/DUI' },
      { field: 'gravamen', header: 'Gravamen' },
      { field: 'identificacion', header: 'Identificación' },
      { field: 'propietario', header: 'Propietario' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'correo', header: 'Correo' },
      { field: 'contacto', header: 'Contacto' }
  ];
  }

  showDialogToAdd() {
    this.newCar = true;
    this.car = {};
    this.displayDialog = true;
}

save() {
  let cars = [];

  if (this.newCar)
      cars.push(this.car);
  else
      cars[this.cars.indexOf(this.selectedCar)] = this.car;

  this.cars = cars;
  this.car = null;
  this.displayDialog = false;
}

delete() {

}

onRowSelect(event) {
  this.newCar = false;
  this.car = this.cloneCar(event.data);
  this.displayDialog = true;
}

cloneCar(c: Car): Car {
  let car = {};
  for (let prop in c) {
      car[prop] = c[prop];
  }
  return car;
}


}

export interface Car {
  ramv?;
  year?;
  brand?;
  color?;
  price?;
  saleDate?;
}
