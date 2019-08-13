import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { UrlService } from '../window.provider.service';
import { Pedido } from './pedido';
import Swal from 'sweetalert2';
import { Paciente } from '../paciente/paciente';



@Injectable()
export class PedidoService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private pedidoURL = this.urlService.getRestApiUrl() + '/pedido';  // URL a la api

    constructor(
        private http: Http,
        private urlService: UrlService
    ) { }
    // me conecto a la base de datos
    getPedidos(estado: string): Promise<Pedido[]> {
        return this.http.get(this.pedidoURL + '/' + estado)
            .toPromise()
            .then(response => response.json().obj as Pedido[]) // coneccion con exito
            .catch(this.handleError); // obtento el error en caso de que se produzca uno
    }


    getPacientes(): Promise<Paciente[]> {
        return this.http.get(this.pedidoURL)
            .toPromise()
            .then(response => response.json().obj as Pedido[]) // coneccion con exito
            .catch(this.handleError); // obtento el error en caso de que se produzca uno
    }

    cargarPedido(
        fechaPed: Date,
        idPac: string,
        idMedica: string,
        idFarma: string,
        idRepar: string,
    ): Promise<Pedido> {
        console.log('entre a cagar pedido');
        return this.http.post(this.pedidoURL,
            JSON.stringify({
                fechaPedido: fechaPed, idPaciente: idPac, idMedicamento: idMedica,
                idFarmacia: idFarma, idRepartidor: idRepar
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Pedido)
            .catch(this.handleError);
    }

    editarPedido(
        idPed: string,
        estadoPed: string,
        horaYFechaPed: Date
    ): Promise<Pedido> {
        console.log('entre a pedido service editar');
        return this.http.patch(this.pedidoURL + '/' + idPed,
            JSON.stringify({
                estadoPedido: estadoPed,
                horaYFechaPedido: horaYFechaPed
            }), { headers: this.headers })
            .toPromise()
            .then(response => response.json().obj as Pedido)
            .catch(this.handleError);
    }

    deletePedido(idPed: string): Promise<Pedido> {
        return this.http.delete(this.pedidoURL + '/' + idPed)
            .toPromise()
            .then(response => response.json().obj as Pedido)
            .catch(this.handleError);
    }

    contarPedidos() {
        return this.http.get(this.pedidoURL + '/conteo/000')
            .toPromise()
            .then(response => response.json().obj as any)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Pedidos: ', error);
        Swal.fire(
            'Error!',
            error.json().error,
            'error'
        );
        return Promise.reject(error.message || error);
    }
}
