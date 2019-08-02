import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Servicio } from './servicio';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServicioService } from './servicio.service';

@Component({
  selector: 'app-domninios',
  templateUrl: './servicios.component.html'
})
export class ServiciosComponent implements OnInit {
  @ViewChild('cerrarAgregar', { static: true }) cerrarAgregar: ElementRef;
  @ViewChild('cerrarEditar', { static: true }) cerrarEditar: ElementRef;


    model: any = {};
    cols: any;
    servicios: Servicio[] = [];
    auxServicios: Servicio[];
    selectedServicio: Servicio;

    constructor(
        private servicioService: ServicioService
    ) { }

    ngOnInit() {
        this.getServicios();
        this.cols = [
            { field: 'nombre', header: 'Nombre' },
            { field: 'detalle', header: 'Detalle' }
        ];
    }

// ***********
// *** GET ***
// ***********
    getServicios(): void {
        this.servicioService.getServicios()
        .then(servicios => {
            this.servicios = servicios;
            this.auxServicios = servicios;
        });
    }


// ***************
// *** AGREGAR ***
// ***************
agregarServicio(f: NgForm): void {
    this.servicioService.postServicio(this.model.nombre, this.model.detalle)
    .then(servicioGuardada => {
        // Cerrar Modal
        this.cerrarAgregar.nativeElement.click();

        // Agregamos el elemento
        this.servicios.push(servicioGuardada);

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
actualizarServicio(): void {
    this.servicioService
        .patchServicio(this.selectedServicio._id,
            this.selectedServicio.nombre,
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

            this.selectedServicio = null;
        });
}

// ****************
// *** ELIMINAR ***
// ****************
eliminarServicio() {
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
            this.servicioService.deleteServicio(this.selectedServicio._id)
                .then(servicioEliminada => {
                    // Mensaje de Exito
                    Swal.fire(
                        'Eliminada!',
                        'Se ha eliminado el área.',
                        'success'
                    );

                    // Eliminamos el elemento del arreglo
                    let i: number;
                    this.servicios.forEach((elem, index) => {
                        if (elem._id === servicioEliminada._id) {
                            i = index;
                        }
                    });
                    this.servicios.splice(i, 1);
                });
        }
    });
}

// *************
// *** OTROS ***
// *************
reiniciarTabla() {
    if (!this.model.filtroNombre && !this.model.filtroDetalle) {
      this.servicios = this.auxServicios;
    }
  }

  filtrarNombre(nombre: string) {
    this.servicios = this.servicios.filter(servicio => servicio.nombre !== undefined);
    this.servicios = this.servicios.filter(servicio => servicio.nombre.toLowerCase().includes(nombre.toLowerCase()));
  }

  filtrarDetalle(detalle: string) {
    this.servicios = this.servicios.filter(servicio => servicio.nombre !== undefined);
    this.servicios = this.servicios.filter(servicio => servicio.nombre.toLowerCase().includes(detalle.toLowerCase()));
  }
}
