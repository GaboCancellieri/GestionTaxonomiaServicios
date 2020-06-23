import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './usuario';
import { UsuarioService } from './user.service';
import {Permission} from './permiso';
import {PermissionService} from './permiso.service';
import {SecurityUtils} from '../SecurityUtils';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  @ViewChild('closeAdd') closeAdd: ElementRef;
  @ViewChild('closeEdit') closeEdit: ElementRef;

    model: any = {};
    usuarios: Usuario[];
    selectedUser: Usuario;
    permisos: Permission[];

    selectedUserLocal: Usuario;
    colsUsuarios: any;
    permisionEdit = false;
    initializedTablePermissions = false;
    usuarioEdit = false;

    constructor(
        private router: Router,
        private usuarioService: UsuarioService,
        private permisoService: PermissionService
    ) { }

    ngOnInit(): void {
        this.getUsuarios();
        this.getPermissions();

        this.colsUsuarios = [
            { field: 'firstName', header: 'Nombre' },
            { field: 'lastName', header: 'Apellido' },
            { field: 'username', header: 'Usuario' }
        ];
    }

    getUsuarios(): void {
        this.usuarioService
            .getUsuarios()
            .then(users => {
                this.usuarios = users;
            });
    }

    getPermissions(): void {
        this.permisoService
            .getPermissions()
            .then(permisos => {
                this.permisos = permisos;
            });
    }

    onRowSelect(event) {
        this.usuarioEdit = true;
        if (!this.initializedTablePermissions) {
            this.initializedTablePermissions = true;
        }
    }

    onRowUnselect(event) {
        this.model.password = null;
    }

    hasPermision(id) {
        if (this.selectedUser.permisos) {
            for (const permiso of this.selectedUser.permisos) {
                if (permiso._id === id) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }

    onAddUsuario(nuevoUsuario: Usuario) {
        this.usuarios = [...this.usuarios, nuevoUsuario];
    }

    onSelect(user: Usuario): void {
        // Hacemos unos clones
        this.selectedUser = Object.assign({}, user);
    }

    onClean(): void {
        // Hacemos unos clones
        this.selectedUser = null;
    }

    onEdit(est: boolean): void {
        this.usuarioEdit = est;
        this.selectedUserLocal = this.selectedUser;
    }

    onSave(user: Usuario): void {
        this.usuarios.forEach(function(elem, index, array) {
            if (elem._id === user._id) {
                this.usuarios[index] = user;
            }
        });
    }

    editPermissions() {
        this.permisionEdit = !this.permisionEdit;
        if (this.permisionEdit) {
            this.selectedUserLocal = this.selectedUser;
        }
    }

    savePermissions() {
        this.usuarioService.updateUsuario(this.selectedUserLocal._id, this.selectedUserLocal.username,
            this.selectedUserLocal.firstName, this.selectedUserLocal.lastName,
            this.selectedUserLocal.password, this.selectedUserLocal.permisos)
            .then(usr => {
                this.getUsuarios();
                this.editPermissions();
            });

    }

    setPermissions(permiso) {
        const index = this.selectedUserLocal.permisos.findIndex(i => i._id === permiso._id);
        if (index > -1) {
            this.selectedUserLocal.permisos.splice(index, 1);
        } else {
            this.selectedUserLocal.permisos.push(permiso);
        }
    }

    cargarUsuario(f: NgForm) {
        this.usuarioService.createUsuario(this.model.username, this.model.nombre, this.model.apellido, this.model.password)
        .then((usuarioAgregado) => {
            // cierro el modal
            this.closeAdd.nativeElement.click();

            // Muestro un mensajito de Agregado con Éxito
            Swal.fire({
                title: 'Success!',
                text: 'The user was created successfully.',
                type: 'success',
                showConfirmButton: false,
                timer: 1200
            });

            // Agrego el Médico al Arreglo de Médicos (actualiza la tabla)
            this.usuarios.push(usuarioAgregado);

            // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
            this.model = {};
            f.resetForm();
        });
    }

    editUser(f: NgForm) {
        this.usuarioService.updateUsuario(
            this.selectedUser._id, this.selectedUser.username, this.selectedUser.firstName,
            this.selectedUser.lastName, this.model.password, this.selectedUser.permisos)
        .then((updatedUser) => {
            // cierro el modal
            this.closeEdit.nativeElement.click();

            // Muestro un mensajito de Agregado con Éxito
            Swal.fire({
                title: 'Success!',
                text: 'The user was updated successfully.',
                type: 'success',
                showConfirmButton: false,
                timer: 1200
            });

            let i;
            this.usuarios.forEach((standard, index) => {
                if (standard._id === updatedUser._id) {
                  i = index;
                }
              });

            this.usuarios[i] = updatedUser;

            // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
            this.model = {};
            f.resetForm();
        });
    }

    generarUsername() {
        if (this.selectedUser) {
            if (this.selectedUser.firstName && !this.selectedUser.lastName) {
                this.selectedUser.username = this.model.nombre.trim().toLowerCase() + '.';
            }
            if (!this.selectedUser.firstName && this.selectedUser.lastName) {
                this.selectedUser.username = this.selectedUser.lastName.trim().toLowerCase();
            }
            if (this.selectedUser.firstName && this.selectedUser.lastName) {
                this.selectedUser.username = this.selectedUser.firstName.trim().toLowerCase() + '.'
                + this.selectedUser.lastName.trim().toLowerCase();
            }
        } else {
            if (this.model.nombre && !this.model.apellido) {
                this.model.username = this.model.nombre.trim().toLowerCase() + '.';
            }
            if (!this.model.nombre && this.model.apellido) {
                this.model.username = this.model.apellido.trim().toLowerCase();
            }
            if (this.model.nombre && this.model.apellido) {
                this.model.username = this.model.nombre.trim().toLowerCase() + '.' + this.model.apellido.trim().toLowerCase();
            }
        }
    }

    checkPermission(permisos) {
        return SecurityUtils.checkPermissions(permisos);
    }

    deleteUser() {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
          .then((willDelete) => {
            if (willDelete.value) {
              this.usuarioService.deleteUser(this.selectedUser._id)
                .then(deletedStandard => {
                  Swal.fire(
                    'Deleted!',
                    'User has been deleted.',
                    'success'
                  );

                  let i;
                  this.usuarios.forEach((standard, index) => {
                    if (standard._id === deletedStandard._id) {
                      i = index;
                    }
                  });

                  this.usuarios.splice(i, 1);
                  this.selectedUser = null;
                });
            } else {
              this.selectedUser = null;
            }
          });

      }
}
