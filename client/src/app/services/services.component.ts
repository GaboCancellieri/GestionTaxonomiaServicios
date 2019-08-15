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
  @ViewChild('cerrarAgregar') cerrarAgregar: ElementRef;

  model: any = {};
  services: Service[];
  serviceTree: TreeNode[];
  selectedService: Service;

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
    this.getServiceTree();
    this.getLayers();
    this.getDomains();
    this.getStandards();
  }

  // ***********
  // *** GET ***
  // ***********
  getServiceTree() {
    this.serviceService.getServiceTree()
      .then(serviceTree => {
        this.serviceTree = serviceTree;
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
  cargarService(f: NgForm) {
    this.serviceService.cargarService(this.model.dniService, this.model.nombreService, this.model.apellidoService,
      this.model.telefonoService, this.model.matriculaService, this.model.especialidadService)
      .then(serviceAgregado => {
        // cierro el modal
        this.cerrarAgregar.nativeElement.click();

        // Muestro un mensajito de Agregado con Éxito
        Swal.fire({
          title: 'Agregado!',
          text: 'Se ha creado el médico correctamente.',
          type: 'success',
          showConfirmButton: false,
          timer: 1200
        });

        // Agrego el Médico al Arreglo de Médicos (actualiza la tabla)
        this.services.push(serviceAgregado);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        f.resetForm();
      });
  }
}

