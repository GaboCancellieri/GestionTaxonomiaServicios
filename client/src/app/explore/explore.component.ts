import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import Swal from 'sweetalert2';
import { ExploreService } from './explore.service';


@Component({
    selector: 'app-explore',
    templateUrl: './explore.component.html',
    animations: [routerTransition()]
})
export class ExploreComponent implements OnInit {
    public busqueda: string;
    public cols;
    public results;
    public methodName;
    constructor(
        private exploreService: ExploreService
    ) { }


    ngOnInit() {
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'value', header: 'Value' },
          ];
    }

    buscar(selectedMethod: string) {
        this.methodName = selectedMethod;
        this.exploreService.buscar(this.busqueda, selectedMethod)
        .then(results => {
            this.results = results;
        });
    }
}
