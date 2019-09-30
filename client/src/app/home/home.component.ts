import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ServiceService } from '../services/services.service';
import { Service } from '../services/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  data: TreeNode[] = [];

  constructor(
    private serviceService: ServiceService
  ) { }

  ngOnInit() {
    this.data = [{
      label: 'Tazonomia',
      children: [
          {
              label: 'Child 1',
              children: [
                  {
                      label: 'Grandchild 1.1', type: 'leaf'
                  },
                  {
                      label: 'Grandchild 1.2', type: 'leaf'
                  }
              ]
          },
          {
              label: 'Child 2',
              children: [
                  {
                      label: 'Child 2.1', type: 'leaf'
                  },
                  {
                      label: 'Child 2.2', type: 'leaf'
                  }
              ]
          }
      ]
  }];
  }

  getServices() {
    this.serviceService.getServices()
      .then(services => {
        this.makeTree(services);
      });
  }

  makeTree(services: Service[]) {
    this.data = [{
      label: 'Taxonomia',
      children: []
    }];

    for (const service of services) {
      if (!service.parent) {
        this.data[0].children.push({
          label: service.name,
          children: []
        });
      } else {

      }
    }
  }
}
