import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  urlActiva = '';

  constructor(private router: Router ) {
  }

  ngOnInit() {
    this.getUrl();
  }

  getUrl() {
    this.router.events.subscribe((url: any) => {
      this.urlActiva = this.router.url;
    });
  }
}
