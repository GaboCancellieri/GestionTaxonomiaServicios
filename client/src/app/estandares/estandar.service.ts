import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Estandar } from './Estandar';
import {UsuarioService} from '../usuario/user.service';

import { UrlService } from '../window.provider.service';
import Swal from 'sweetalert2';

@Injectable()
export class EstandarService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private estandarURL = this.urlService.getRestApiUrl() + '/estandar';  // URL to web api

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
    getEstandares(): Promise<Estandar[]> {
        return this.http.get(this.estandarURL, this.jwt())
        .toPromise()
        .then(response => response.json().obj as Estandar[])
        .catch(this.handleError);
    }

    getEstandar(id: string): Promise<Estandar> {
        return this.http.get(this.estandarURL + '/' + id, this.jwt())
        .toPromise()
        .then(response => response.json().obj as Estandar)
        .catch(this.handleError);
    }

// ************
// *** POST ***
// ************
    postEstandar(nombre: string, detalle: string): Promise<Estandar> {
        return this.http
        .post(this.estandarURL, JSON.stringify({nombre, detalle}), {headers: this.headers})
        .toPromise()
        .then(res => {
            return res.json().obj as Estandar;
        })
        .catch(this.handleError);
    }

// *************
// *** PATCH ***
// *************
    patchEstandar(idEstandar: string, nombre: string, detalle: string): Promise<Estandar> {
        return this.http
        .patch(this.estandarURL + '/' + idEstandar, JSON.stringify(
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
    deleteEstandar(idEstandar: string): Promise<any> {
        return this.http
        .delete(this.estandarURL + '/' + idEstandar,
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
        console.error('Ocurrio un error en servicio de Estandar: ', error);
        Swal.fire(
            'Error!',
            error.json().error,
            'error'
        );
        return Promise.reject(error.message || error);
    }
}