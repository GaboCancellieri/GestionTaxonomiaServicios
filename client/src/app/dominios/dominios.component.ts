import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Dominio } from './dominio';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { DominioService } from './dominio.service';

@Component({
  selector: 'app-domninios',
  templateUrl: './dominios.component.html'
})
export class DominiosComponent implements OnInit {
  @ViewChild('cerrarAgregar', { static: true }) cerrarAgregar: ElementRef;
  @ViewChild('cerrarEditar', { static: true }) cerrarEditar: ElementRef;


    model: any = {};
    cols: any;
    dominios: Dominio[] = [];
    auxDominios: Dominio[];
    selectedDominio: Dominio;

    constructor(
        private dominioService: DominioService
    ) { }

    ngOnInit() {
        this.getDominios();
        this.cols = [
            { field: 'nombre', header: 'Nombre' },
            { field: 'detalle', header: 'Detalle' }
        ];
    }

// ***********
// *** GET ***
// ***********
    getDominios(): void {
        this.dominioService.getDominios()
        .then(dominios => {
            this.dominios = dominios;
            this.auxDominios = dominios;
        });
    }


// ***************
// *** AGREGAR ***
// ***************
agregarDominio(f: NgForm): void {
    this.dominioService.postDominio(this.model.nombre, this.model.detalle)
    .then(dominioGuardada => {
        // Cerrar Modal
        this.cerrarAgregar.nativeElement.click();

        // Agregamos el elemento
        this.dominios.push(dominioGuardada);

        // Mensaje de Éxito
        Swal.fire({
            title: 'Agregado!',
            text: 'Se ha agregado el contrato correctamente.',
            type: 'success',
            showConfirmButton: false,
            timer: 1200
          });


        // Reiniciar los campos del formulario
        this.model = {};
        f.resetForm();
    });
}
// ******************
// *** ACTUALIZAR ***
// ******************
actualizarDominio(): void {
    this.dominioService
        .patchDominio(this.selectedDominio._id,
            this.selectedDominio.nombre,
            '')
        .then(contratoActualizado => {
            // Cerrar Modal
            this.cerrarEditar.nativeElement.click();

            // Mensaje de Éxito
            Swal.fire({
                title: 'Actualizada!',
                text: 'Se ha actualizado el área correctamente.',
                type: 'success',
                showConfirmButton: false,
                timer: 1200
            });

            this.selectedDominio = null;
        });
}

// ****************
// *** ELIMINAR ***
// ****************
eliminarDominio() {
    Swal.fire({
        title: 'Seguro?',
        text: 'Los cambios no se podrán revertir!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
    }).then((result) => {
        if (result.value) {
            this.dominioService.deleteDominio(this.selectedDominio._id)
                .then(dominioEliminada => {
                    // Mensaje de Exito
                    Swal.fire(
                        'Eliminada!',
                        'Se ha eliminado el área.',
                        'success'
                    );

                    // Eliminamos el elemento del arreglo
                    let i: number;
                    this.dominios.forEach((elem, index) => {
                        if (elem._id === dominioEliminada._id) {
                            i = index;
                        }
                    });
                    this.dominios.splice(i, 1);
                });
        }
    });
}

// *************
// *** OTROS ***
// *************
reiniciarTabla() {
    if (!this.model.filtroNombre && !this.model.filtroDetalle) {
      this.dominios = this.auxDominios;
    }
  }

  filtrarNombre(nombre: string) {
    this.dominios = this.dominios.filter(dominio => dominio.nombre !== undefined);
    this.dominios = this.dominios.filter(dominio => dominio.nombre.toLowerCase().includes(nombre.toLowerCase()));
  }

  filtrarDetalle(detalle: string) {
    this.dominios = this.dominios.filter(dominio => dominio.nombre !== undefined);
    this.dominios = this.dominios.filter(dominio => dominio.nombre.toLowerCase().includes(detalle.toLowerCase()));
  }
}
