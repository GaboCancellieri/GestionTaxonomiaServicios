import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Service } from './service';
import { ServiceService } from './services.service';
import { NgForm } from '@angular/forms';
import { TreeNode } from 'primeng/api';

import Swal from 'sweetalert2';
import { LayerService } from '../layers/layer.service';
import { DomainService } from '../domain/domain.service';
import { StandardService } from '../standards/standard.service';
import { Layer } from '../layers/layer';
import { Domain } from '../domain/domain';
import { Standard } from '../standards/standard';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  animations: [routerTransition()]
})
export class ServiceComponent implements OnInit {
  @ViewChild('closeAdd') closeAdd: ElementRef;

  model: any = {};
  services: Service[];
  selectedService: Service;
  selectedParent: Service;
  cols = [];

  layers: Layer[];
  selectedLayer: Layer;

  domains: Domain[];
  selectedDomain: Domain;

  standards: Standard[];
  selectedStandard: Standard;

  constructor(
    private serviceService: ServiceService,
    private layerService: LayerService,
    private domainService: DomainService,
    private standardService: StandardService,
  ) { }


  ngOnInit() {
    this.getServices();
    this.getLayers();
    this.getDomains();
    this.getStandards();

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'layer', header: 'Layer' },
      { field: 'domain', header: 'Domain' },
      { field: 'parent', header: 'Parent' },
      { field: 'standard', header: 'Standard' },
      { field: 'user', header: 'User' },
    ];
  }

  // ***********
  // *** GET ***
  // ***********
  getServices() {
    this.serviceService.getServices()
      .then(services => {
        this.services = services;
      });
  }

  getLayers() {
    this.layerService.getLayers()
      .then(layers => {
        this.layers = layers;
      });
  }

  getDomains() {
    this.domainService.getDomains()
      .then(domains => {
        this.domains = domains;
      });
  }

  getStandards() {
    this.standardService.getStandards()
      .then(standards => {
        this.standards = standards;
      });
  }

  // ***************
  // *** AGREGAR ***
  // ***************
  addService(f: NgForm) {
    let idStandard = null;
    if (this.selectedStandard) {
      idStandard = this.selectedStandard._id;
    }

    let idParent = null;
    if (this.selectedParent) {
      idParent = this.selectedParent._id;
    }

    this.serviceService.addService(this.model.serviceName, this.selectedLayer._id, this.selectedDomain._id,
      idStandard, idParent)
      .then(addedService => {
        // cierro el modal
        this.closeAdd.nativeElement.click();

        // Muestro un mensajito de Agregado con Éxito
        Swal.fire({
          title: 'Agregado!',
          text: 'Se ha creado el médico correctamente.',
          type: 'success',
          showConfirmButton: false,
          timer: 1200
        });

        // Agrego el Médico al Arreglo de Médicos (actualiza la tabla)
        this.services.push(addedService);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        f.resetForm();
      });
  }
}

