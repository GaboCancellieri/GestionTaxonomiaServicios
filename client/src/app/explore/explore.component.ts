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

    constructor(
        private exploreService: ExploreService
    ) { }


    ngOnInit() {

    }

    buscar() {
        console.log(this.busqueda);
        this.exploreService.buscar(this.busqueda);
    }
}
