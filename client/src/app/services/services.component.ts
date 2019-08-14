import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Service } from './service';
import { ServiceService } from './services.service';
import { NgForm } from '@angular/forms';
import { TreeNode } from 'primeng/api';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './services.component.html',
  animations: [routerTransition()]
})
export class ServiceComponent implements OnInit {
  @ViewChild('cerrarAgregar') cerrarAgregar: ElementRef;

  model: any = {};
  services: Service[];
  serviceTree: TreeNode[];
  cols: any[];
  selectedService: Service;

  constructor(
    private serviceService: ServiceService
  ) { }


  ngOnInit() {
    this.getServices();
    this.cols = [
      { field: 'layer', header: 'Layer' },
      { field: 'name', header: 'Name' },
    ];
  }

  // ***********
  // *** GET ***
  // ***********
  getServices() {
    this.serviceService.getServices()
      .then(services => {
        this.services = services;
        this.makeServiceTree(services)
        .then(serviceTree => {
          this.serviceTree = serviceTree;
        });
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

  // ***************
  // **** OTHER ****
  // ***************
  async makeServiceTree(services: Service[]): Promise<TreeNode[]> {
    if (services && services.length !== 0) {
      const serviceTree = [];
      for (const service of services) {
        const children = await this.makeServiceTree(service.services);
        const layerName = this.getInitials(service.layer.name);
        const serviceNode = {
          label: layerName + ': ' + service.name,
          data: service._id,
          expandedIcon: 'fas fa-folder-open',
          collpasedIcon: 'fas fa-folder',
          children
        };
        serviceTree.push(serviceNode);
      }
      return serviceTree;
    }
  }

  getInitials(str: string) {
    const names = str.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }
}

