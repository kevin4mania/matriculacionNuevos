import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
nombreApp= environment.nombreAplicaion;


  constructor(
    public _sidebar: SidebarService,
    public _usuarioService : UsuarioService
    ) { }
  
  ngOnInit() {
    
  }

}
