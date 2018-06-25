import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'api-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private data: DatastoreService) { }

  ngOnInit() {
  }
}
