import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../window.provider.service';
import { Layer } from './layer';
import Swal from 'sweetalert2';



@Injectable()
export class LayerService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private layerURL = this.urlService.getRestApiUrl() + '/layer';

    constructor(
        private http: Http,
        private urlService: UrlService
    ) { }

    getLayers(): Promise<Layer[]> {
        return this.http.get(this.layerURL)
            .toPromise()
            .then(response => response.json().obj as Layer[])
            .catch(this.handleError);
    }

    addLayer(
        name: string,
    ): Promise<Layer> {
        return this.http.post(this.layerURL,
            JSON.stringify({ name }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Layer)
            .catch(this.handleError);
    }

    editLayer(
        idLayer: string,
        name: string): Promise<Layer> {
        return this.http.patch(this.layerURL + '/' + idLayer,
            JSON.stringify({ name }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Layer)
            .catch(this.handleError);
    }

    deleteLayer(idLayer: string): Promise<Layer> {
        return this.http.delete(this.layerURL + '/' + idLayer)
            .toPromise()
            .then(response => response.json().obj as Layer)
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
