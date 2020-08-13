import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  nombre:string;
  constructor(public _usuarioService : UsuarioService) { }

  ngOnInit() {
    this.nombre = this._usuarioService.persona.nom+' '+this._usuarioService.persona.ape;
  }

}
