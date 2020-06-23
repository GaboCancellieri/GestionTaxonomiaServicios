import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Service } from './service';
import { ServiceService } from './services.service';
import { NgForm } from '@angular/forms';

import Swal, { SweetAlertOptions } from 'sweetalert2';
import { LayerService } from '../layers/layer.service';
import { DomainService } from '../domain/domain.service';
import { StandardService } from '../standards/standard.service';
import { Layer } from '../layers/layer';
import { Domain } from '../domain/domain';
import { Standard } from '../standards/standard';
import { UsuarioService } from '../usuario/user.service';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  animations: [routerTransition()]
})
export class ServiceComponent implements OnInit {
  @ViewChild('closeAdd') closeAdd: ElementRef;
  @ViewChild('closeEdit') closeEdit: ElementRef;

  model: any = {};
  filter: any = {};
  services: Service[];
  auxServices: Service[];
  selectedService: Service = null;
  selectedParent: Service = null;
  cols = [];

  layers: Layer[];
  selectedLayer: Layer = null;

  domains: Domain[];
  selectedDomain: Domain = null;

  standards: Standard[];
  selectedStandard: Standard = null;

  userId: string;

  constructor(
    private serviceService: ServiceService,
    private layerService: LayerService,
    private domainService: DomainService,
    private standardService: StandardService,
    private userService: UsuarioService,
  ) { }


  ngOnInit() {
    this.getServices();
    this.getLayers();
    this.getDomains();
    this.getStandards();

    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'layer', header: 'Layer' },
      { field: 'domain', header: 'Domain' },
      { field: 'standard', header: 'Standard' },
      { field: 'parent', header: 'Parent' },
      { field: 'user', header: 'User' },
    ];
  }

  // ***********
  // *** GET ***
  // ***********
  getServices() {
    this.serviceService.getServices()
      .then(services => {
        this.auxServices = services;
        this.onFilter();
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

  // ***********
  // *** ADD ***
  // ***********
  addService(f: NgForm) {
    let idStandard = null;
    if (this.model.selectedStandard) {
      idStandard = this.model.selectedStandard._id;
    }

    let idParent = null;
    if (this.model.selectedParent) {
      idParent = this.model.selectedParent._id;
    }

    this.serviceService.addService(this.model.serviceName, this.model.selectedLayer._id, this.model.selectedDomain._id,
      idStandard, idParent, this.userId).then(addedService => {
        // cierro el modal
        this.closeAdd.nativeElement.click();

        // Muestro un mensajito de Agregado con Éxito
        Swal.fire({
          title: 'Success!',
          text: 'The service was added successfully.',
          type: 'success',
          showConfirmButton: false,
          timer: 1200
        });

        // Agrego el Médico al Arreglo de Médicos (actualiza la tabla)
        this.auxServices.push(addedService);
        this.onFilter();

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        f.resetForm();
        this.model = {};
      });
  }

  // ************
  // *** EDIT ***
  // ************
  editService(f: NgForm) {
    let idStandard = null;
    if (this.selectedStandard) {
      idStandard = this.selectedStandard._id;
    }

    let idParent = null;
    if (this.selectedParent) {
      idParent = this.selectedParent._id;
    }

    this.serviceService.editService(this.selectedService._id, this.selectedService.name, this.selectedLayer._id, this.selectedDomain._id,
      idStandard, idParent, this.userId).then(editedService => {
        // cierro el modal
        this.closeEdit.nativeElement.click();

        this.getServices();

        // Muestro un mensajito de Editado con Éxito
        Swal.fire({
          title: 'Success!',
          text: 'The service was edited successfully.',
          type: 'success',
          showConfirmButton: false,
          timer: 1200
        });

        f.resetForm();
      });
  }

  // **************
  // *** DELETE ***
  // **************
  deleteService() {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are trying to delete a service, this action can make great changes in the taxonomy.
            If this service node has children, then all of them will be part of this node's parent.
            If this service node doesn't have a parent, then all children will be part of the root of the taxonomy.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
        this.serviceService.deleteService(this.selectedService._id)
        .then(deletedService => {
          this.getServices();

          // Muestro un mensajito de Agregado con Éxito
          Swal.fire({
            title: 'Deleted!',
            text: 'The service was deleted successfully.',
            type: 'success',
            showConfirmButton: false,
            timer: 1200
          });
        });
      }
    });
  }

  // **************
  // *** EVENTS ***
  // **************
  onFilter() {
    this.services = this.auxServices;

    if (this.filter.name) {
      this.services = this.services.filter(s => s.name.toLowerCase().includes(this.filter.name.toLowerCase()));
    }

    if (this.filter.layer) {
      this.services = this.services.filter(s => s.layer && s.layer.name.toLowerCase().includes(this.filter.layer.toLowerCase()));
    }

    if (this.filter.domain) {
      this.services = this.services.filter(s => s.domain && s.domain.name.toLowerCase().includes(this.filter.domain.toLowerCase()));
    }

    if (this.filter.standard) {
      this.services = this.services.filter(s => s.standard && s.standard.name.toLowerCase().includes(this.filter.standard.toLowerCase()));
    }

    if (this.filter.parent) {
      this.services = this.services.filter(s => s.parent && s.parent.name.toLowerCase().includes(this.filter.parent.toLowerCase()));
    }

    if (this.filter.user) {
      this.services = this.services.filter(s => s.user && (
        s.user.firstName.toLowerCase().includes(this.filter.user.toLowerCase()) ||
        s.user.lastName.toLowerCase().includes(this.filter.user.toLowerCase())
      ));
    }
  }

  onRowSelect(event) {
    this.selectedService = event.data;
    this.selectedLayer = (this.selectedService.layer) ? this.selectedService.layer : null;
    this.selectedDomain = (this.selectedService.domain) ? this.selectedService.domain : null;
    this.selectedStandard = (this.selectedService.standard) ? this.selectedService.standard : null;

    if (this.selectedService.parent) {
      this.selectedParent = this.auxServices.find((s) => s._id === this.selectedService.parent._id);
    }
  }

  onRowUnselect() {
    this.selectedLayer = null;
    this.selectedDomain = null;
    this.selectedStandard = null;
    this.selectedParent = null;
  }
}

