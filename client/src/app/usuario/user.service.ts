import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Usuario } from './usuario';
import { Permission } from './permiso';
import { UrlService } from '../window.provider.service';
import Swal from 'sweetalert2';

@Injectable()
export class UsuarioService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private usuarioURL = this.urlService.getRestApiUrl() + '/usuario';  // URL to web api
    constructor(private http: Http,
                private urlService: UrlService) { }

    getUsuarios(): Promise<Usuario[]> {

        return this.http.get(this.usuarioURL, this.jwt())
            .toPromise()
            .then(response => response.json().obj as Usuario[])
            .catch(this.handleError);
    }

    createUsuario(userName: string, userFirstName: string, userLastName: string, pass: string): Promise<Usuario> {
        return this.http
            .post(this.usuarioURL, JSON.stringify({
                username: userName, firstName: userFirstName,
                lastName: userLastName, password: pass
            }), { headers: this.headers })
            .toPromise()
            .then(res => {
                return res.json().obj as Usuario;
            })
            .catch(this.handleError);
    }

    create(Usuario: Usuario) {
        return this.http.post('/api/Usuarios', Usuario, this.jwt()).map((response: Response) => response.json());
    }

    public jwt(): RequestOptions {
        const currentUsuario = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUsuario && currentUsuario.token) {
            const headers2 = new Headers({ Authorization: 'Bearer ' + currentUsuario.token });
            return new RequestOptions({ headers: headers2 });
        }
    }

    public getUserLogueado() {
        const currentUsuario = JSON.parse(localStorage.getItem('currentUser'));
        return currentUsuario;
    }

    public savePermissions() {
        return this.http.get(this.usuarioURL, this.jwt())
            .toPromise()
            .then(response => response.json().obj as Usuario[])
            .catch(this.handleError);

    }
    public getToken() {
        const currentUsuario = JSON.parse(localStorage.getItem('currentUser'));
        return currentUsuario.token;
    }

    private handleError(error: any): Promise<any> {
        console.error('Ocurrio un error en Servicio de Usuarios: ', error);
        Swal.fire(
            'Error!',
            error.json().error,
            'error'
        );
        return Promise.reject(error.message || error);
    }

    public updateUsuario(id: string, userName: string, userFirstName: string, userLastName: string,
                         pass: string, permis: Permission[]): Promise<Usuario> {
        return this.http.patch(this.usuarioURL + '/' + id,
                JSON.stringify({
                    username: userName, firstName: userFirstName,
                    lastName: userLastName, password: pass, permisos: permis
                }),
                { headers: this.headers })
            .toPromise()
            .then(res => {
                return res.json().obj;
            })
            .catch(this.handleError);
    }

    getFullUser(id: string): Promise<Usuario> {
        return this.http.get(this.usuarioURL + '/' + id, this.jwt())
            .toPromise()
            .then(response => response.json().obj as Usuario)
            .catch(this.handleError);
    }

    deleteUser(id): Promise<Usuario> {
        return this.http.delete(this.usuarioURL + '/' + id, this.jwt())
            .toPromise()
            .then(response => response.json().obj as Usuario)
            .catch(this.handleError);
    }

}
