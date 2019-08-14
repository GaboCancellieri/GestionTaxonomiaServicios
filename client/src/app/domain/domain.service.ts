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
    cargarDomain(
        dniPac: string,
        nombrePac: string,
        apellidoPac: string,
        telefonoPac: string,
        direccionPac: string,
        barrioPac: string,
        fechaNacimientoPac: Date): Promise<Domain> {

        return this.http.post(this.domainURL,
            JSON.stringify({
                dniDomain: dniPac, nombreDomain: nombrePac,
                apellidoDomain: apellidoPac, telefonoDomain: telefonoPac, direccionDomain: direccionPac,
                barrioDomain: barrioPac, fechaNacimientoDomain: fechaNacimientoPac
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Domain)
            .catch(this.handleError);
    }

    // *************
    // *** PATCH ***
    // *************
    editarDomain(
        idPac: string,
        nombrePac: string,
        apellidoPac: string,
        telefonoPac: string,
        direccionPac: string,
        barrioPac: string,
        fechaNacimientoPac: Date): Promise<Domain> {
        return this.http.patch(this.domainURL + '/' + idPac,
            JSON.stringify({
                nombreDomain: nombrePac,
                apellidoDomain: apellidoPac, telefonoDomain: telefonoPac, direccionDomain: direccionPac,
                barrioDomain: barrioPac, fechaNacimientoDomain: fechaNacimientoPac
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Domain)
            .catch(this.handleError);
    }

    cargarConsumicion(idDomain: string, idMedicamento: string, frec: number, cantCon: number): Promise<Domain> {
        return this.http.patch(this.domainURL + '/cargarConsumicion/' + idDomain + '/' + idMedicamento,
            JSON.stringify({ frecuencia: frec, cantidadConsumicion: cantCon }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Domain)
            .catch(this.handleError);
    }

    quitarConsumicion(idPac: string, idConsum: string): Promise<Domain> {
        return this.http.patch(this.domainURL + '/quitarConsumicion/' + idPac,
            JSON.stringify({ idConsumicion: idConsum}), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Domain)
            .catch(this.handleError);
    }

    // **************
    // *** DELETE ***
    // **************
    deleteDomain(idPac: string): Promise<Domain> {
        return this.http.delete(this.domainURL + '/' + idPac)
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
