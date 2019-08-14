import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../window.provider.service';
import { Standard } from './standard';
import Swal from 'sweetalert2';

@Injectable()
export class StandardService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private standardURL = this.urlService.getRestApiUrl() + '/standard';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) { }

    getStandards(): Promise<Standard[]> {
        console.log(this.standardURL);
        return this.http.get(this.standardURL)
            .toPromise()
            .then(response => response.json().obj as Standard[])
            .catch(this.handleError);
    }

    getStandardsNoConsumePaciente(idPaciente: string): Promise<Standard[]> {

        return this.http.get(this.standardURL + '/noConsume' + '/' + idPaciente)
            .toPromise()
            .then(response => response.json().obj as Standard[])
            .catch(this.handleError);
    }

    getStandardsNoFarmacia(idFarmacia: string): Promise<Standard[]> {

        return this.http.get(this.standardURL + '/noConsumeFarmacia' + '/' + idFarmacia)
            .toPromise()
            .then(response => response.json().obj as Standard[])
            .catch(this.handleError);
    }

    cargarStandard(
        nombreMedMedicam: string,
        dosisMedMedicam: string,
        cadenaDeFrioMedMedicam: string,
        laboratorioMedicam: string,
        cantidadComprimidosMedicam: number): Promise<Standard> {

        console.log('CantCompromidos:');
        console.log(cantidadComprimidosMedicam);

        return this.http.post(this.standardURL,
            JSON.stringify({
                nombreStandard: nombreMedMedicam,
                dosisStandard: dosisMedMedicam, cadenaFrioStandard: cadenaDeFrioMedMedicam,
                laboratorioStandard: laboratorioMedicam,
                cantidadComprimidosStandard: cantidadComprimidosMedicam
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Standard)
            .catch(this.handleError);
    }

    editarStandard(
        idMedMedicam: string,
        nombreMedMedicam: string): Promise<Standard> {
        console.log('hola');
        return this.http.patch(this.standardURL + '/' + idMedMedicam,
            JSON.stringify({
                idStandard: idMedMedicam, nombreStandard: nombreMedMedicam
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Standard)
            .catch(this.handleError);
    }

    deleteStandard(idMedMedicam: string): Promise<Standard> {
        return this.http.delete(this.standardURL + '/' + idMedMedicam)
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
