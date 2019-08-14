import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Standard } from './standard';
import { StandardService } from './standard.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-standards',
  templateUrl: './standards.component.html',
  animations: [routerTransition()]
})
export class StandardComponent implements OnInit {
  @ViewChild('cerrarAgregar') cerrarAgregar: ElementRef;
  @ViewChild('cerrarEditar') cerrarEditar: ElementRef;

  model: any = {};
  standards: Standard[] = [];
  cols: any[];
  selectedStandard: Standard;
  modalAgregarStandard = false;
  modalEditarStandard = false;
  modalEliminarStandard = false;
  cadenaFrio = '';


  constructor(
    private standardService: StandardService
  ) { }


  ngOnInit() {
    this.getStandards();

    this.cols = [
      { field: 'idStandard', header: 'Codigo' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'dosis', header: 'Dosis' },
      { field: 'cadenaFrio', header: 'Cadena Frio' },
      { field: 'laboratorio', header: 'Laboratorio' },
      { field: 'cantidadComprimidos', header: 'Cantidad Comprimidos' }
    ];
  }

  // ***********
  // *** GET ***
  // ***********
  getStandards() {
    this.standardService.getStandards()
      .then(standards => {
        this.standards = standards;
        console.log(standards);
      });
  }

  // ***************
  // *** AGREGAR ***
  // ***************
  cargarStandard(cadenaFrio: string, f: NgForm) {
    this.modalAgregarStandard = false;
    this.standardService.cargarStandard(
      this.model.nombreStandard,
      this.model.dosisStandard,
      cadenaFrio,
      this.model.laboratorioStandard,
      this.model.cantidadComprimidosStandard)
      .then(standardAgregado => {
        // cierro el modal
        this.cerrarAgregar.nativeElement.click();

        // Muestro un mensajito de Agregado con Éxito
        Swal.fire({
          title: 'Agregado!',
          text: 'Se ha creado el standard correctamente.',
          type: 'success',
          showConfirmButton: false,
          timer: 1200
        });

        // Agrego el Médico al Arreglo de Médicos (actualiza la tabla)
        this.standards.push(standardAgregado);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        this.model = {};
        f.resetForm();
      });
  }

  // ******************
  // *** ACTUALIZAR ***
  // ******************
  editarStandard(f: NgForm) {
    this.standardService.editarStandard(this.selectedStandard._id,
      this.selectedStandard.nombre)
      .then(standardEditado => {
        // cierro el modal
        this.cerrarEditar.nativeElement.click();

        // Muestro un mensajito de Actualizado con Éxito
        Swal.fire({
          title: 'Actualizado!',
          text: 'Se ha actualizado el standard correctamente.',
          type: 'success',
          showConfirmButton: false,
          timer: 1200
        });

        // PARA ACTUALIZAR VISTA (TABLA)
        this.standards.forEach(elementoStandard => {
          if (elementoStandard._id === standardEditado._id) {
            elementoStandard = standardEditado;
          }
        });

        // Reseteo el selectedStandard y el formulario de editar
        this.selectedStandard = null;
        f.resetForm();
      });
  }

  // ****************
  // *** ELIMINAR ***
  // ****************
  eliminarStandard() {
    // Mensajito: ¿ESTAS SEGURO?
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta acción no se puede revertir!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          // SI ACEPTA
          this.standardService.deleteStandard(this.selectedStandard._id)
            .then(standardEliminado => {
              Swal.fire({
                title: 'Eliminado!',
                text: 'Standard eliminado correctamente',
                type: 'success',
                showConfirmButton: false,
                timer: 1200
              });
              // Elimino el medico del arreglo de medicos (actualiza la tabla)
              let i;

              // Con el forEach busco la posicion (index) del medico eliminado
              this.standards.forEach((standard, index) => {
                if (standard._id === standardEliminado._id) {
                  i = index;
                }
              });

              // 'splice' corta el arreglo justo en el indice 'i'
              this.standards.splice(i, 1);

              // Reseteo el medico seleccionado a null
              this.selectedStandard = null;
            });
        } else {
          // Reseteo el medico seleccionado a null
          this.selectedStandard = null;
        }
      });

  }

  mostrarModalAgregarStandard() {
    this.modalAgregarStandard = true;
  }

  mostrarModalEditar() {
    if (this.selectedStandard != null) {
      this.modalEditarStandard = true;
    }

  }

  cerrarModalEditar() {
    this.modalEditarStandard = false;
  }
}

