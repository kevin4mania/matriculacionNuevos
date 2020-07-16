import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ServiciosService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, UiServicesService} from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  providers: [
    ServiciosService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    UiServicesService,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
