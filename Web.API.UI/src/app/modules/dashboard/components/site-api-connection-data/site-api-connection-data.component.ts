import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-site-api-connection-data',
  templateUrl: './site-api-connection-data.component.html',
  styleUrls: ['./site-api-connection-data.component.scss']
})
export class SiteApiConnectionDataComponent implements OnInit {

  code;
  constructor() {
    this.code = `/site-api-connection-data.component.html`;
  }

  ngOnInit() {
  }

}
