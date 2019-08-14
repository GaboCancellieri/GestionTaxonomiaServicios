import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Domain } from './domain';
import { DomainService } from './domain.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  animations: [routerTransition()]
})
export class DomainComponent implements OnInit {
  @ViewChild('cerrarAgregar') cerrarAgregar: ElementRef;

  model: any = {};
  domains: Domain[] = [];
  cols: any[];
  selectedDomain: Domain;
  hoy: string;

  constructor(
    private domainService: DomainService
  ) { }


  ngOnInit() {
    this.getDomains();

    this.cols = [
      { field: 'dni', header: 'DNI' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'direccion', header: 'Direccion' },
      { field: 'barrio', header: 'Barrio' },
      { field: 'fechaNacimiento', header: 'Fecha de Nacimiento' }
    ];
  }

  // ***********
  // *** GET ***
  // ***********
  getDomains() {
    this.hoy = new Date(Date.now()).toLocaleString().slice(0, 14);
    this.domainService.getDomains()
      .then(domains => {
        this.domains = domains;
      });
  }

  // ***************
  // *** AGREGAR ***
  // ***************
  cargarDomain(f: NgForm) {
    this.domainService.cargarDomain(this.model.dniDomain, this.model.nombreDomain, this.model.apellidoDomain,
      this.model.telefonoDomain, this.model.direccionDomain, this.model.barrioDomain, this.model.fechaNacimientoDomain)
      .then(domainAgregado => {
        // cierro el modal
        this.cerrarAgregar.nativeElement.click();

        // Muestro un mensajito de Agregado con Éxito
        Swal.fire({
          type: 'success',
          title: 'Agregado!',
          text: 'Se ha creado el domain correctamente.',
          showConfirmButton: false,
          timer: 1500
        });

        // Agrego el Médico al Arreglo de Médicos (actualiza la tabla)
        this.domains.push(domainAgregado);

        // Reseteo el formulario/modal para que no haya nada en los input cuando se vuelva a abrir
        this.model = {};
        f.resetForm();
      });
  }
}

