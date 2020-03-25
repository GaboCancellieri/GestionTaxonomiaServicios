import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

// COMPONENTES
import { UsuariosComponent } from './usuario/usuarios.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DomainComponent } from './domain/domains.component';
import { StandardComponent } from './standards/standards.component';
import { LayerComponent } from './layers/layers.component';
import { ServiceComponent } from './services/services.component';
import { ExploreComponent } from './explore/explore.component';

const routes: Routes = [
  // REDIRECCIONAMIENTO A INICIO
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // RUTAS A COMPONENTES
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'explore', component: ExploreComponent, canActivate: [AuthGuard] },
  { path: 'domains', component: DomainComponent, canActivate: [AuthGuard] },
  { path: 'standards', component: StandardComponent, canActivate: [AuthGuard] },
  { path: 'layers', component: LayerComponent, canActivate: [AuthGuard] },
  { path: 'services', component: ServiceComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
