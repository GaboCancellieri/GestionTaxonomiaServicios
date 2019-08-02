import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthenticationService } from './auth/auth.service';
import { HttpModule } from '@angular/http';
import { UrlService } from './window.provider.service';
import { WINDOW_PROVIDERS } from './window.provider';
import { PermissionService } from './usuario/permiso.service';

// PRIMENG
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

// COMPONENTES
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from './usuario/user.service';
import { EstandaresComponent } from './estandares/estandares.component';
import { DominiosComponent } from './dominios/dominios.component';
import { ServiciosComponent } from './servicios/servicios.component';

// SERVICIOS
import { EstandarService } from './estandares/estandar.service';
import { DominioService } from './dominios/dominio.service';
import { ServicioService } from './servicios/servicio.service';
import { UsuariosComponent } from './usuario/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    InicioComponent,
    EstandaresComponent,
    DominiosComponent,
    ServiciosComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    TableModule,
    ButtonModule,
    MessagesModule,
    MessageModule

  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UrlService,
    WINDOW_PROVIDERS,
    PermissionService,
    UsuarioService,
    EstandarService,
    DominioService,
    ServicioService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
