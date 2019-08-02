import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { Estandar } from './estandar';
import { EstandarService } from './estandar.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-estandares',
  templateUrl: './estandares.component.html'
})
export class EstandaresComponent implements OnInit{
  @ViewChild('cerrarAgregar', { static: true }) cerrarAgregar: ElementRef;
  @ViewChild('cerrarEditar', { static: true }) cerrarEditar: ElementRef;


    model: any = {};
    cols: any;
    estandares: Estandar[] = [];
    auxEstandares: Estandar[];
    selectedEstandar: Estandar;

    constructor(
        private estandarService: EstandarService
    ) { }

    ngOnInit() {
        this.getEstandares();
        this.cols = [
            { field: 'nombre', header: 'Nombre' },
            { field: 'detalle', header: 'Detalle' }
        ];
    }

// ***********
// *** GET ***
// ***********
    getEstandares(): void {
        this.estandarService.getEstandares()
        .then(estandares => {
            this.estandares = estandares;
            this.auxEstandares = estandares;
        });
    }


// ***************
// *** AGREGAR ***
// ***************
agregarEstandar(f: NgForm): void {
    this.estandarService.postEstandar(this.model.nombre, this.model.detalle)
    .then(estandarGuardada => {
        // Cerrar Modal
        this.cerrarAgregar.nativeElement.click();

        // Agregamos el elemento
        this.estandares.push(estandarGuardada);

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
actualizarEstandar(): void {
    this.estandarService
        .patchEstandar(this.selectedEstandar._id,
            this.selectedEstandar.nombre,
            this.selectedEstandar.detalle)
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

            this.selectedEstandar = null;
        });
}

// ****************
// *** ELIMINAR ***
// ****************
eliminarEstandar() {
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
            this.estandarService.deleteEstandar(this.selectedEstandar._id)
                .then(estandarEliminada => {
                    // Mensaje de Exito
                    Swal.fire(
                        'Eliminada!',
                        'Se ha eliminado el área.',
                        'success'
                    );

                    // Eliminamos el elemento del arreglo
                    let i: number;
                    this.estandares.forEach((elem, index) => {
                        if (elem._id === estandarEliminada._id) {
                            i = index;
                        }
                    });
                    this.estandares.splice(i, 1);
                });
        }
    });
}

// *************
// *** OTROS ***
// *************
reiniciarTabla() {
    if (!this.model.filtroNombre && !this.model.filtroDetalle) {
      this.estandares = this.auxEstandares;
    }
  }

  filtrarNombre(nombre: string) {
    this.estandares = this.estandares.filter(estandar => estandar.nombre !== undefined);
    this.estandares = this.estandares.filter(estandar => estandar.nombre.toLowerCase().includes(nombre.toLowerCase()));
  }

  filtrarDetalle(detalle: string) {
    this.estandares = this.estandares.filter(estandar => estandar.nombre !== undefined);
    this.estandares = this.estandares.filter(estandar => estandar.nombre.toLowerCase().includes(detalle.toLowerCase()));
  }
}
