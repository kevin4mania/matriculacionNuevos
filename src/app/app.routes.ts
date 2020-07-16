import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { ChangePasswordComponent } from './login/change-password.component';

import { RedirectGuard } from './services/service.index';


const appRoutes: Routes = [
    { path: 'login', canActivate:[RedirectGuard], component: LoginComponent, data:{ titulo: 'Inicio', descripcion:'Inicio'} },
    { path: 'forgotPassword', component: ForgotPasswordComponent, data:{ titulo: 'Recuperar Contraseña', descripcion:'Recuperar Contraseña'} },
    { path: 'changePassword/:id', component: ChangePasswordComponent, data:{ titulo: 'Modificar Contraseña', descripcion:'Modificar Contraseña'} },
    { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
