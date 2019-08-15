import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../window.provider.service';
import { Domain } from './domain';
import Swal from 'sweetalert2';



@Injectable()
export class DomainService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private domainURL = this.urlService.getRestApiUrl() + '/domain';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) { }

    // ***********
    // *** GET ***
    // ***********
    getDomains(): Promise<Domain[]> {
        console.log(this.domainURL);
        return this.http.get(this.domainURL)
            .toPromise()
            .then(response => response.json().obj as Domain[])
            .catch(this.handleError);
    }

    getDomain(idDomain: string): Promise<Domain> {
        console.log(this.domainURL);
        return this.http.get(this.domainURL + '/' + idDomain)
            .toPromise()
            .then(response => response.json().obj as Domain)
            .catch(this.handleError);
    }

    // ************
    // *** POST ***
    // ************
    addDomain(
        name: string): Promise<Domain> {
        return this.http.post(this.domainURL,
            JSON.stringify({ name }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Domain)
            .catch(this.handleError);
    }

    // *************
    // *** PATCH ***
    // *************
    editDomain(
        idDomain: string,
        name: string): Promise<Domain> {
        return this.http.patch(this.domainURL + '/' + idDomain,
            JSON.stringify({ name }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Domain)
            .catch(this.handleError);
    }

    // **************
    // *** DELETE ***
    // **************
    deleteDomain(idDomain: string): Promise<Domain> {
        return this.http.delete(this.domainURL + '/' + idDomain)
            .toPromise()
            .then(response => response.json().obj as Domain)
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
