import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../window.provider.service';
import { Layer } from './layer';
import Swal from 'sweetalert2';



@Injectable()
export class LayerService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private layerURL = this.urlService.getRestApiUrl() + '/layer';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) { }
    // me conecto a la base de datos
    getLayers(estado: string): Promise<Layer[]> {
        return this.http.get(this.layerURL + '/' + estado)
            .toPromise()
            .then(response => response.json().obj as Layer[]) // coneccion con exito
            .catch(this.handleError); // obtento el error en caso de que se produzca uno
    }

    cargarLayer(
        fechaPed: Date,
        idPac: string,
        idMedica: string,
        idFarma: string,
        idRepar: string,
    ): Promise<Layer> {
        console.log('entre a cagar layer');
        return this.http.post(this.layerURL,
            JSON.stringify({
                fechaLayer: fechaPed, idPaciente: idPac, idMedicamento: idMedica,
                idFarmacia: idFarma, idRepartidor: idRepar
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Layer)
            .catch(this.handleError);
    }

    editarLayer(
        idPed: string,
        estadoPed: string,
        horaYFechaPed: Date
    ): Promise<Layer> {
        console.log('entre a layer service editar');
        return this.http.patch(this.layerURL + '/' + idPed,
            JSON.stringify({
                estadoLayer: estadoPed,
                horaYFechaLayer: horaYFechaPed
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Layer)
            .catch(this.handleError);
    }

    deleteLayer(idPed: string): Promise<Layer> {
        return this.http.delete(this.layerURL + '/' + idPed)
            .toPromise()
            .then(response => response.json().obj as Layer)
            .catch(this.handleError);
    }

    contarLayers() {
        return this.http.get(this.layerURL + '/conteo/000')
            .toPromise()
            .then(response => response.json().obj as any)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Layers: ', error);
        Swal.fire(
            'Error!',
            error.json().error,
            'error'
        );
        return Promise.reject(error.message || error);
    }
}
