import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Service } from './service';
import { ServiceService } from './services.service';
import { NgForm } from '@angular/forms';
import {TreeNode} from 'primeng/api';

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

