import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'api-dash-nav-icons',
  templateUrl: './dash-nav-icons.component.html',
  styleUrls: ['./dash-nav-icons.component.scss']
})
export class DashNavIconsComponent implements OnInit {
  
  routeLinks: any;

  constructor( ) {
    this.routeLinks = [
      {label: 'Dashboard', link: 'site/dashboard'},
      {label: 'Customers', link: 'site/customers'},
      {label: 'Employees', link: 'site/employees'},
      {label: 'Orders', link: 'site/orders'},
      // {label: 'Invoices', link: 'invoices'},
      {label: 'Site Details', link: 'site/details'},
      {label: 'API Data', link: 'site/api-connection-details'},
      {label: 'Site Logs', link: 'site/site-logs'},
    ];
   }

  ngOnInit() {
  }

}
