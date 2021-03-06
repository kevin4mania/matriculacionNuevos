import { NgModule } from "@angular/core";
import { PAGES_ROUTES } from "./pages.routes";

import { SharedModule } from "../shared/shared.module";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { TemplateComponent } from "./template/template.component";
import { PagesComponent } from "./pages.component";

import { PerfilComponent } from "./perfil/perfil.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ComponentsModule } from "../components/components.module";
import { TramitesComponent } from "./tramites/tramites.component";

import { TableModule } from "primeng/table";
import { ScrollPanelModule } from "primeng/scrollpanel";

import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorIntl } from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NuevoTramiteComponent } from "./nuevo-tramite/nuevo-tramite.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { VistaDocumentosComponent } from "./nuevo-tramite/vista-documentos/vista-documentos.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatriculacionComponent } from './matriculacion/matriculacion.component';
// import {TreeTableModule} from 'primeng/treetable';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    TemplateComponent,
    PerfilComponent,
    TramitesComponent,
    NuevoTramiteComponent,
    VistaDocumentosComponent,
    MatriculacionComponent,
  ],
  exports: [DashboardComponent, TemplateComponent],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ComponentsModule,
    TableModule,
    ScrollPanelModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    MatCardModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
  ],
  entryComponents: [VistaDocumentosComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: TramitesComponent }],
})
export class PagesModule {}
