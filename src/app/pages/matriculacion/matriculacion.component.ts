import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { matriculacionRes, Retorno } from "src/app/models/matriculacionRes.model";
import { ServiciosService } from "src/app/services/service.index";
import Swal from 'sweetalert2'


@Component({
  selector: "app-matriculacion",
  templateUrl: "./matriculacion.component.html",
  styleUrls: ["./matriculacion.component.css"],
})
export class MatriculacionComponent implements OnInit {
  // displayedColumns: string[] = ["nmTr", "nmVh", "esta", "details"];
  // dataSource = new MatTableDataSource<PeriodicElement>([]);
  tramites = [];
  constructor(public servicios: ServiciosService) { }

  ngOnInit() {
    this.obtenerTramites();
  }

  // public doFilter = (value: string) => {
  //   this.dataSource.filter = value.trim().toLocaleLowerCase();
  // };
  obtenerTramites() {
    this.servicios.getTodoPropiedadesVehiculo().subscribe((res: matriculacionRes) => {
      if (res.codRetorno == "0001") {
        this.tramites = res.retorno;
        console.log(this.tramites);
        // this.dataSource=new MatTableDataSource<PeriodicElement>(this.tramites);
      } else {
        this.alertErrorMessage('No se pudieron ingresar los datos, intente nuevamente')
      }
    }, error => {
      this.alertErrorMessage('No se pudieron ingresar los datos, intente nuevamente')
    });
  }
  alertErrorMessage(message) {
    Swal.fire({
      title: 'Error!',
      text: message,
      type: 'error',
      confirmButtonText: 'Aceptar'
    })
  }
}

export interface PeriodicElement {
  name: string;
  position: string;
  weight: number;
  symbol: string;
}
