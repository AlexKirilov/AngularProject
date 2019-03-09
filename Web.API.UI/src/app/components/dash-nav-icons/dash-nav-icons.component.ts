import { Component } from '@angular/core';

@Component({
  selector: 'app-dash-nav-icons',
  templateUrl: './dash-nav-icons.component.html',
  styleUrls: ['./dash-nav-icons.component.scss']
})
export class DashNavIconsComponent {

  routeLinks: any;

  constructor( ) {
    this.routeLinks = [
      {label: 'Dashboard', link: 'dashboard', icon: 'dashboard'},
      {label: 'Customers', link: 'customers', icon: 'face'},
      {label: 'Employees', link: 'employees', icon: 'person'},
      {label: 'Orders', link: 'orders', icon: 'shopping_cart'},
      {label: 'Site Details', link: 'details', icon: 'details'},
      {label: 'API Data', link: 'api-connection-details', icon: 'settings_applications'},
      {label: 'Site Logs', link: 'site-logs', icon: 'notes'},
    ];
   }
}
