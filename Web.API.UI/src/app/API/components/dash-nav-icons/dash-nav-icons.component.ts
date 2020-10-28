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
      {label: 'Dashboard', link: 'user/dashboard', icon: 'dashboard'},
      {label: 'Customers', link: 'user/customers', icon: 'face'},
      {label: 'Employees', link: 'user/employees', icon: 'person'},
      {label: 'Orders', link: 'user/orders', icon: 'shopping_cart'},
      {label: 'Site Details', link: 'user/details', icon: 'details'},
      {label: 'API Data', link: 'user/api-con-data', icon: 'settings_applications'},
      {label: 'Site Logs', link: 'user/site-logs', icon: 'notes'},
    ];
   }
}
