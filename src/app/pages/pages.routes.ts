import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from "./pages.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { LoginGuardGuard } from "../services/service.index";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TramitesComponent } from "./tramites/tramites.component";
import { NuevoTramiteComponent } from "./nuevo-tramite/nuevo-tramite.component";
import { MatriculacionComponent } from "./matriculacion/matriculacion.component";

const pagesRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: "inicio",
        component: DashboardComponent,
        data: {
          titulo: "Dashboard",
          descripcion: "Control de Asistencia y Actividades",
          icon: "ik ik-align-justify",
        },
      },
      {
        path: "perfil",
        component: PerfilComponent,
        data: {
          titulo: "Mi Perfil",
          descripcion: "Personaliza tus datos",
          icon: "ik ik-user",
        },
      },
      {
        path: "tramites",
        component: TramitesComponent,
        data: {
          titulo: "Trámites",
          descripcion: "Gestor de Trámites",
          icon: "ik ik-file",
        },
      },
      {
        path: "tramites/tramite/:id",
        component: NuevoTramiteComponent,
        data: {
          titulo: "Nuevo Trámite",
          descripcion: "Generación de Trámites",
          icon: "ik ik-user",
        },
      },
      {
        path: "matriculacion",
        component: MatriculacionComponent,
        data: {
          titulo: "Matriculación",
          descripcion: "Gestor de Matriculación",
          icon: "ik ik-file",
        },
      },
      { path: "", redirectTo: "/tramites", pathMatch: "full" },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
