import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Layer } from './layer';
import { LayerService } from './layer.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

interface Estados {
  name: string;
}

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  animations: [routerTransition()]
})
export class LayerComponent implements OnInit {
  @ViewChild('cerrarAgregar') cerrarAgregar: ElementRef;

  model: any = {};
  layers: Layer[] = [];
  cols: any[];
  selectedLayer: Layer;
  fecha: string;

  estados: Estados[];
  selectedEstado: Estados;

  constructor(
    private layerService: LayerService,
  ) {}


  ngOnInit() {
    this.cols = [
      { field: 'numero', header: 'Numero Layer' },
      { field: 'estadosLayer', header: 'Estado' },
      { field: 'fecha', header: 'Fecha Layer' },
      { field: 'paciente', subfield: 'apellido', header: 'Apellido Paciente' },
      { field: 'paciente', subfield: 'direccion', header: 'Dirección' },
      { field: 'repartidor', header: 'Apellido Repartidor' },
      { field: 'medicamento', subfield: 'nombre', header: 'Medicamento' },
      { field: 'medicamento', subfield: 'cadenaFrio', header: 'Cadena Frio' }
    ];
  }

  // ***********
  // *** GET ***
  // ***********
  getLayers(estado: string) {
    this.layerService.getLayers(estado)
      .then(layers => {
        this.layers = layers;
      });
  }

  // CARGAR PEDIDO
  cargarLayer(f: NgForm) {
    this.layerService.cargarLayer(this.model.fechaLayer, this.model.paciente._id,
      this.model.medicamento._id, this.model.farmacia._id, this.model.repartidor._id )
      .then(layerAgregado => {
        console.log(layerAgregado);
        // cierro el modal
        this.cerrarAgregar.nativeElement.click();

        // Muestro un mensajito de Agregado con Éxito
        Swal.fire({
          title: 'Agregado!',
          text: 'Se ha creado el layer correctamente.',
          type: 'success',
          showConfirmButton: false,
          timer: 1200
        });

        // Agrego el Layer al Arreglo de Layers (actualiza la tabla)
        this.layers.push(layerAgregado);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        f.resetForm();
      });
  }

  // EDITAR Layer
  editarLayer(f: NgForm) {

  }

  // ELIMINAR PEDIDO
  eliminarLayer() {
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
          this.layerService.deleteLayer(this.selectedLayer._id)
            .then(layerEliminado => {
              Swal.fire(
                'Eliminado!',
                'Layer eliminado correctamente',
                'success'
              );
              // Elimino el medico del arreglo de medicos (actualiza la tabla)
              let i;

              // Con el forEach busco la posicion (index) del medico eliminado
              this.layers.forEach((layer, index) => {
                if (layer._id === layerEliminado._id) {
                  i = index;
                }
              });

              // 'splice' corta el arreglo justo en el indice 'i'
              this.layers.splice(i, 1);

              // Reseteo el medico seleccionado a null
              this.selectedLayer = null;
            });
        } else {
          // Reseteo el medico seleccionado a null
          this.selectedLayer = null;
        }
      });

  }
}




