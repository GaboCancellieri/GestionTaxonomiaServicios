import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../window.provider.service';
import Swal from 'sweetalert2';

@Injectable()
export class ExploreService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private URL = this.urlService.getRestApiUrl() + '/explore';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) { }

    buscar(word: string) {
        return this.http.get(this.URL + '/' + word)
            .toPromise()
            .then(response => response.json().obj as any[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Domains: ', error);
        Swal.fire(
            'Error!',
            error.json().error,
            'error'
        );
        return Promise.reject(error.message || error);
    }
}
