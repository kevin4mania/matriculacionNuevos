import { NgModule } from "@angular/core";
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplateComponent } from './template/template.component';
import { PagesComponent } from './pages.component';

import { PerfilComponent } from './perfil/perfil.component';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { ComponentsModule } from '../components/components.module';
import { TramitesComponent } from './tramites/tramites.component';

@NgModule({
declarations:[
    PagesComponent,
    DashboardComponent,
    TemplateComponent,
    PerfilComponent,
    DashboardAdminComponent,
    TramitesComponent,
],
exports:[
    DashboardComponent,
    TemplateComponent,
],
imports:[
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ComponentsModule
]

})

export class PagesModule { }
