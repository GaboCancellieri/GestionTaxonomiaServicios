import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTES
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { EstandaresComponent } from './estandares/estandares.component';
import { DominiosComponent } from './dominios/dominios.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { UsuariosComponent } from './usuario/usuarios.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },

  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'estandares', component: EstandaresComponent, canActivate: [AuthGuard] },
  { path: 'dominios', component: DominiosComponent, canActivate: [AuthGuard] },
  { path: 'servicios', component: ServiciosComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
