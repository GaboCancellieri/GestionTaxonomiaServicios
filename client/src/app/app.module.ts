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

// COMPONENTES
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from './usuario/user.service';
import { EstandaresComponent } from './estandares/estandares.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    InicioComponent,
    EstandaresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    TableModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UrlService,
    WINDOW_PROVIDERS,
    PermissionService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
