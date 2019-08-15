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
  @ViewChild('closeAdd') closeAdd: ElementRef;
  @ViewChild('closeEdit') closeEdit: ElementRef;

  model: any = {};
  standards: Standard[] = [];
  cols: any[];
  selectedStandard: Standard;
  hoy: string;

  constructor(
    private standardService: StandardService
  ) { }


  ngOnInit() {
    this.getStandards();

    this.cols = [
      { field: 'name', header: 'Name' },
    ];
  }

  // ***********
  // *** GET ***
  // ***********
  getStandards() {
    this.standardService.getStandards()
      .then(standards => {
        this.standards = standards;
      });
  }

  // ***********
  // *** ADD ***
  // ***********
  addStandard(f: NgForm) {
    this.standardService.addStandard(this.model.name)
      .then(addedStandard => {
        this.closeAdd.nativeElement.click();

        Swal.fire({
          type: 'success',
          title: 'Success!',
          text: 'Standard added successfully.',
          showConfirmButton: false,
          timer: 1200
        });

        this.standards.push(addedStandard);

        this.model = {};
        f.resetForm();
      });
  }

  // ************
  // *** EDIT ***
  // ************
  editStandard(f: NgForm) {
    this.standardService.editStandard(this.selectedStandard._id, this.selectedStandard.name)
      .then(editedStandard => {
        this.closeEdit.nativeElement.click();

        Swal.fire({
          type: 'success',
          title: 'Success!',
          text: 'Standard edited successfully.',
          showConfirmButton: false,
          timer: 1200
        });
      });
  }

  // **************
  // *** DELETE ***
  // **************
  deleteStandard() {
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
          this.standardService.deleteStandard(this.selectedStandard._id)
            .then(deletedStandard => {
              Swal.fire(
                'Deleted!',
                'Standard has been deleted.',
                'success'
              );

              let i;
              this.standards.forEach((standard, index) => {
                if (standard._id === deletedStandard._id) {
                  i = index;
                }
              });

              this.standards.splice(i, 1);
              this.selectedStandard = null;
            });
        } else {
          this.selectedStandard = null;
        }
      });

  }
}
