import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.scss'],
})
export class TramitesComponent implements OnInit {
  tramites: any[];
  selectedFormularios: [];
  loading = false;

  constructor() { 

  }

  ngOnInit() {
   
  }

}
