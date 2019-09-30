import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// PrimeNG
import {AccordionModule, CalendarModule, MenuItem} from 'primeng/primeng';
import { SharedModule, PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/button';
import { DataTableModule } from 'primeng/primeng';
import { TableModule } from 'primeng/components/table/table';
import {DropdownModule} from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TabViewModule} from 'primeng/tabview';
import {TreeModule} from 'primeng/tree';
import {OrganizationChartModule} from 'primeng/organizationchart';

// COMPONENTES
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { UsuariosComponent } from './usuario/usuarios.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DomainComponent } from './domain/domains.component';
import { StandardComponent } from './standards/standards.component';
import { LayerComponent } from './layers/layers.component';
import { ServiceComponent } from './services/services.component';

// SERVICIOS
import { AuthenticationService } from './auth/auth.service';
import { UrlService } from './window.provider.service';
import { WINDOW_PROVIDERS } from './window.provider';
import { UsuarioService } from './usuario/user.service';
import { AuthGuard } from './auth/auth.guard';
import { ServiceService } from './services/services.service';
import { StandardService} from './standards/standard.service';
import { DomainService} from './domain/domain.service';
import { LayerService } from './layers/layer.service';
import { PermissionService } from './usuario/permiso.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    UsuariosComponent,
    DomainComponent,
    StandardComponent,
    LayerComponent,
    ServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    CommonModule,
    HttpClientModule,
    AccordionModule,
    ButtonModule,
    PanelModule,
    SharedModule,
    DataTableModule,
    TableModule,
    CalendarModule,
    FormsModule,
    DialogModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    TabViewModule,
    TreeModule,
    OrganizationChartModule
  ],
  providers: [
    AuthenticationService,
    Location,
    UrlService,
    WINDOW_PROVIDERS,
    UsuarioService,
    AuthGuard,
    ServiceService,
    StandardService,
    DomainService,
    LayerService,
    PermissionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
