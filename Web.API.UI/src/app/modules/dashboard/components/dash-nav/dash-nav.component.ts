import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nav-menu',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.scss']
})
export class DashNavComponent implements OnInit {

  routeLinks: any;

  constructor( ) {
    this.routeLinks = [
      {label: 'Dashboard', link: 'dashboard'},
      {label: 'Customers', link: 'customers'},
      {label: 'Employees', link: 'employees'},
      {label: 'Invoices', link: 'invoices'},
      {label: 'Site Details', link: 'details'},
      {label: 'API Data', link: 'api-connection-details'},
      {label: 'Site Logs', link: 'site-logs'},
    ];
   }

  ngOnInit() {
  }

}
