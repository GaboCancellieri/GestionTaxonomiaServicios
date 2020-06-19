import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Layer } from './layer';
import { LayerService } from './layer.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  animations: [routerTransition()]
})
export class LayerComponent implements OnInit {
  @ViewChild('closeAdd') closeAdd: ElementRef;
  @ViewChild('closeEdit') closeEdit: ElementRef;

  model: any = {};
  layers: Layer[] = [];
  cols: any[];
  selectedLayer: Layer;
  hoy: string;

  constructor(
    private layerService: LayerService
  ) { }


  ngOnInit() {
    this.getLayers();

    this.cols = [
      { field: 'name', header: 'Name' },
    ];
  }

  // ***********
  // *** GET ***
  // ***********
  getLayers() {
    this.layerService.getLayers()
      .then(layers => {
        this.layers = layers;
      });
  }

  // ***********
  // *** ADD ***
  // ***********
  addLayer(f: NgForm) {
    this.layerService.addLayer(this.model.name)
      .then(addedLayer => {
        this.closeAdd.nativeElement.click();

        Swal.fire({
          type: 'success',
          title: 'Success!',
          text: 'Layer added successfully.',
          showConfirmButton: false,
          timer: 1200
        });

        this.layers.push(addedLayer);

        this.model = {};
        f.resetForm();
      });
  }

  // ************
  // *** EDIT ***
  // ************
  editLayer(f: NgForm) {
    this.layerService.editLayer(this.selectedLayer._id, this.selectedLayer.name)
      .then(editedLayer => {
        this.closeEdit.nativeElement.click();

        Swal.fire({
          type: 'success',
          title: 'Success!',
          text: 'Layer edited successfully.',
          showConfirmButton: false,
          timer: 1200
        });
      });
  }

  // **************
  // *** DELETE ***
  // **************
  deleteLayer() {
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
          this.layerService.deleteLayer(this.selectedLayer._id)
            .then(deletedLayer => {
              Swal.fire(
                'Deleted!',
                'Layer has been deleted.',
                'success'
              );

              let i;
              this.layers.forEach((layer, index) => {
                if (layer._id === deletedLayer._id) {
                  i = index;
                }
              });

              this.layers.splice(i, 1);
              this.selectedLayer = null;
            });
        } else {
          this.selectedLayer = null;
        }
      });

  }
}
