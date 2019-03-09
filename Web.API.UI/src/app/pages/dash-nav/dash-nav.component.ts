import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'site-nav-menu',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.scss']
})
export class DashNavComponent {

  routeLinks: any;

  constructor( ) {
    this.routeLinks = [
      {label: 'Dashboard', link: 'dashboard', icon: 'dashboard'},
      {label: 'Customers', link: 'customers', icon: 'person'},
      {label: 'Employees', link: 'employees', icon: 'face'},
      {label: 'Orders', link: 'orders', icon: 'shopping_cart'},
      {label: 'Site Details', link: 'details', icon: 'details'},
      {label: 'API Data', link: 'api-connection-details', icon: 'settings_applications'},
      {label: 'Site Logs', link: 'site-logs', icon: 'notes'},
    ];
   }
}
