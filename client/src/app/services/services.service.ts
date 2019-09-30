import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../window.provider.service';
import { Service } from './service';
import { TreeNode } from 'primeng/api';
import Swal from 'sweetalert2';



@Injectable()
export class ServiceService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private serviceURL = this.urlService.getRestApiUrl() + '/service';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) { }

    getServices(): Promise<Service[]> {
        return this.http.get(this.serviceURL)
            .toPromise()
            .then(response => response.json().obj as Service[])
            .catch(this.handleError);
    }

    getService(idService: string): Promise<Service> {
        return this.http.get(this.serviceURL + '/' + idService)
            .toPromise()
            .then(response => response.json().obj as Service)
            .catch(this.handleError);
    }

    getServiceTree(): Promise<TreeNode[]> {
        return this.http.get(this.serviceURL + '/service/tree')
            .toPromise()
            .then(response => response.json().obj as TreeNode[])
            .catch(this.handleError);
    }

    addService(
        name: string, layer: string, domain: string, standard: string, parent: string): Promise<Service> {
        console.log(this.serviceURL);
        return this.http.post(this.serviceURL,
            JSON.stringify({
                name, layer, domain, standard, parent
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Service)
            .catch(this.handleError);
    }

    editarService(
        idMed: string,
        nombreMed: string,
        apellidoMed: string,
        telefonoMed: string,
        matriculaMed: string,
        especialidadMed: string): Promise<Service> {
        return this.http.patch(this.serviceURL + '/' + idMed,
            JSON.stringify({
                nombreService: nombreMed,
                apellidoService: apellidoMed, telefonoService: telefonoMed,
                matriculaService: matriculaMed, especialidadService: especialidadMed
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Service)
            .catch(this.handleError);
    }

    deleteService(idMed: string): Promise<Service> {
        return this.http.delete(this.serviceURL + '/' + idMed)
            .toPromise()
            .then(response => response.json().obj as Service)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Services: ', error);
        Swal.fire(
            'Error!',
            error.json().error,
            'error'
        );
        return Promise.reject(error.message || error);
    }
}
