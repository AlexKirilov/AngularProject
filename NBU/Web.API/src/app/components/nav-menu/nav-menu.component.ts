import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'api-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  routeLinks: any;

  constructor(
    private router: Router
  ) {
    this.routeLinks = [
      {label: 'Pie Chart', link: 'pie-chart'},
    ]
   }

  ngOnInit() {
  }

}
