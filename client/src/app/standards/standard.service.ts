import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../window.provider.service';
import { Standard } from './standard';
import Swal from 'sweetalert2';



@Injectable()
export class StandardService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private standardURL = this.urlService.getRestApiUrl() + '/standard';

    constructor(
        private http: Http,
        private urlService: UrlService
    ) { }

    getStandards(): Promise<Standard[]> {
        return this.http.get(this.standardURL)
            .toPromise()
            .then(response => response.json().obj as Standard[])
            .catch(this.handleError);
    }

    addStandard(
        name: string, color: string
    ): Promise<Standard> {
        return this.http.post(this.standardURL,
            JSON.stringify({ name, color }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Standard)
            .catch(this.handleError);
    }

    editStandard(
        idStandard: string,
        name: string, color: string): Promise<Standard> {
        return this.http.patch(this.standardURL + '/' + idStandard,
            JSON.stringify({ name, color }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Standard)
            .catch(this.handleError);
    }

    deleteStandard(idStandard: string): Promise<Standard> {
        return this.http.delete(this.standardURL + '/' + idStandard)
            .toPromise()
            .then(response => response.json().obj as Standard)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Standards: ', error);
        Swal.fire(
            'Error!',
            error.json().error,
            'error'
        );
        return Promise.reject(error.message || error);
    }
}
