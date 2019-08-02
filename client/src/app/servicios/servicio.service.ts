import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Servicio } from './Servicio';
import {UsuarioService} from '../usuario/user.service';

import { UrlService } from '../window.provider.service';
import Swal from 'sweetalert2';

@Injectable()
export class ServicioService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private servicioURL = this.urlService.getRestApiUrl() + '/servicio';  // URL to web api

    constructor(
        private http: Http,
        private userService: UsuarioService,
        private urlService: UrlService
        ) { }

    private jwt() {
        return this.userService.jwt();
    }


// ***********
// *** GET ***
// ***********
    getServicios(): Promise<Servicio[]> {
        return this.http.get(this.servicioURL, this.jwt())
        .toPromise()
        .then(response => response.json().obj as Servicio[])
        .catch(this.handleError);
    }

    getServicio(id: string): Promise<Servicio> {
        return this.http.get(this.servicioURL + '/' + id, this.jwt())
        .toPromise()
        .then(response => response.json().obj as Servicio)
        .catch(this.handleError);
    }

// ************
// *** POST ***
// ************
    postServicio(nombre: string, detalle: string): Promise<Servicio> {
        return this.http
        .post(this.servicioURL, JSON.stringify({nombre, detalle}), {headers: this.headers})
        .toPromise()
        .then(res => {
            return res.json().obj as Servicio;
        })
        .catch(this.handleError);
    }

// *************
// *** PATCH ***
// *************
    patchServicio(idServicio: string, nombre: string, detalle: string): Promise<Servicio> {
        return this.http
        .patch(this.servicioURL + '/' + idServicio, JSON.stringify(
            {nombre, detalle}), {headers: this.headers})
        .toPromise()
        .then(res => {
            return res.json().obj;
        })
        .catch(this.handleError);
    }

// **************
// *** DELETE ***
// **************
    deleteServicio(idServicio: string): Promise<any> {
        return this.http
        .delete(this.servicioURL + '/' + idServicio,
            {headers: this.headers})
        .toPromise()
        .then(res => {
            return res.json().obj;
        })
        .catch(this.handleError);

    }

// *************
// *** ERROR ***
// *************
    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en servicio de Servicio: ', error);
        Swal.fire(
            'Error!',
            error.json().error,
            'error'
        );
        return Promise.reject(error.message || error);
    }
}