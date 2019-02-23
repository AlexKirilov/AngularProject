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
      {label: 'Dashboard', link: 'site/dashboard', icon: 'dashboard'},
      {label: 'Customers', link: 'site/customers', icon: 'face'},
      {label: 'Employees', link: 'site/employees', icon: 'person'},
      {label: 'Orders', link: 'site/orders', icon: 'shopping_cart'},
      {label: 'Site Details', link: 'site/details', icon: 'details'},
      {label: 'API Data', link: 'site/api-connection-details', icon: 'settings_applications'},
      {label: 'Site Logs', link: 'site/site-logs', icon: 'notes'},
    ];
   }
}
