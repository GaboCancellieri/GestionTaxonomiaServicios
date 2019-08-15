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
  @ViewChild('closeAdd') closeAdd: ElementRef;
  @ViewChild('closeEdit') closeEdit: ElementRef;

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
      { field: 'name', header: 'Name' },
    ];
  }

  // ***********
  // *** GET ***
  // ***********
  getDomains() {
    this.domainService.getDomains()
      .then(domains => {
        this.domains = domains;
      });
  }

  // ***********
  // *** ADD ***
  // ***********
  addDomain(f: NgForm) {
    this.domainService.addDomain(this.model.name)
      .then(addedDomain => {
        this.closeAdd.nativeElement.click();

        Swal.fire({
          type: 'success',
          title: 'Success!',
          text: 'Domain added successfully.',
          showConfirmButton: false,
          timer: 1200
        });

        this.domains.push(addedDomain);

        this.model = {};
        f.resetForm();
      });
  }

  // ************
  // *** EDIT ***
  // ************
  editDomain(f: NgForm) {
    this.domainService.editDomain(this.selectedDomain._id, this.selectedDomain.name)
      .then(editedDomain => {
        this.closeEdit.nativeElement.click();

        Swal.fire({
          type: 'success',
          title: 'Success!',
          text: 'Domain edited successfully.',
          showConfirmButton: false,
          timer: 1200
        });
      });
  }

  // **************
  // *** DELETE ***
  // **************
  deleteDomain() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then((willDelete) => {
        if (willDelete.value) {
          this.domainService.deleteDomain(this.selectedDomain._id)
            .then(deletedDomain => {
              Swal.fire(
                'Deleted!',
                'Domain has been deleted.',
                'success'
              );

              let i;
              this.domains.forEach((layer, index) => {
                if (layer._id === deletedDomain._id) {
                  i = index;
                }
              });

              this.domains.splice(i, 1);
              this.selectedDomain = null;
            });
        } else {
          this.selectedDomain = null;
        }
      });

  }
}

