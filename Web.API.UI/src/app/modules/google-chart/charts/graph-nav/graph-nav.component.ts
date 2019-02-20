import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graph-nav',
  templateUrl: './graph-nav.component.html',
  styleUrls: ['./graph-nav.component.scss']
})
export class GraphNavComponent implements OnInit {
  routeLinks: any;

  constructor(
    private router: Router
  ) {
    this.routeLinks = [
      {label: 'Pie Chart', link: 'pie-chart'},
      {label: 'Bar Chart', link: 'bar-chart'},
      {label: 'Combo Chart', link: 'combo-chart'},
      {label: 'Line Chart', link: 'line-chart'},
      {label: 'Table Chart', link: 'table-chart'},
    ]
   }

  ngOnInit() {
  }

}
