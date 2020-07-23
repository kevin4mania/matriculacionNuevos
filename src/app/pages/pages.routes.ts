import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginGuardGuard } from '../services/service.index';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TramitesComponent } from './tramites/tramites.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate:[LoginGuardGuard],
        children: [
            { path: 'inicio', component: DashboardComponent, data:{ titulo: 'Dashboard', descripcion:'Control de Asistencia y Actividades', icon:'ik ik-align-justify'} },
            { path: 'perfil', component: PerfilComponent,  data:{ titulo: 'Mi Perfil', descripcion:'Personaliza tus datos', icon:'ik ik-user'}  },
            { path: 'tramites', component: TramitesComponent, data:{ titulo: 'Trámites', descripcion:'Personaliza tus datos', icon:'ik ik-user'}  },
            { path: '', redirectTo: '/tramites', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
