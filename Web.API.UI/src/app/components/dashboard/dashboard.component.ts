import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';

@Component({
  selector: 'api-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private data: DatastoreService) { }

  ngOnInit() {
  }
  call() {
    this.data.test(res => {console.log('Result ', res)})
  }
}
