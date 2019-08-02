import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Dominio } from './Dominio';
import {UsuarioService} from '../usuario/user.service';

import { UrlService } from '../window.provider.service';
import Swal from 'sweetalert2';

@Injectable()
export class DominioService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private dominioURL = this.urlService.getRestApiUrl() + '/dominio';  // URL to web api

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
    getDominios(): Promise<Dominio[]> {
        return this.http.get(this.dominioURL, this.jwt())
        .toPromise()
        .then(response => response.json().obj as Dominio[])
        .catch(this.handleError);
    }

    getDominio(id: string): Promise<Dominio> {
        return this.http.get(this.dominioURL + '/' + id, this.jwt())
        .toPromise()
        .then(response => response.json().obj as Dominio)
        .catch(this.handleError);
    }

// ************
// *** POST ***
// ************
    postDominio(nombre: string, detalle: string): Promise<Dominio> {
        return this.http
        .post(this.dominioURL, JSON.stringify({nombre, detalle}), {headers: this.headers})
        .toPromise()
        .then(res => {
            return res.json().obj as Dominio;
        })
        .catch(this.handleError);
    }

// *************
// *** PATCH ***
// *************
    patchDominio(idDominio: string, nombre: string, detalle: string): Promise<Dominio> {
        return this.http
        .patch(this.dominioURL + '/' + idDominio, JSON.stringify(
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
    deleteDominio(idDominio: string): Promise<any> {
        return this.http
        .delete(this.dominioURL + '/' + idDominio,
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
        console.error('Ocurrio un error en servicio de Dominio: ', error);
        Swal.fire(
            'Error!',
            error.json().error,
            'error'
        );
        return Promise.reject(error.message || error);
    }
}