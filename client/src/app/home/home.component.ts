import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ServiceService } from '../services/services.service';
import { Service } from '../services/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  data: TreeNode[] = [{
    label: 'Taxonomy',
    expanded: true,
    children: []
  }];

  constructor(
    private serviceService: ServiceService
  ) { }

  ngOnInit() {
    this.getServices();
  }
  getServices() {
    this.serviceService.getServices()
      .then(services => {
        console.log(services)
        this.makeTree(services);
      });
  }

  async makeTree(services: Service[]) {
    for (const service of services) {
      if (!service.parent) {
        this.data[0].children.push({
          label: service.code + ': ' + service.name,
          icon: "fas fa-code",
          children: []
        });
      } else {
        let parentNode = await this.searchTree(this.data[0], service.parent.code + ': ' + service.parent.name);
        parentNode.icon = null;
        parentNode.expandedIcon = "fas fa-folder-open";
        parentNode.collapsedIcon = "fas fa-folder";
        parentNode.children.push({
          label: service.code + ': ' + service.name,
          icon: "fas fa-code",
          children: []
        });
      }
    }
  }

  searchTree(element, label) {
    if (element.label === label) {
      return element;
    } else if (element.children !== null) {
      let i = 0;
      let result = null;
      for (i; result == null && i < element.children.length; i++) {
        result = this.searchTree(element.children[i], label);
      }
      return result;
    }
    return null;
  }
}
