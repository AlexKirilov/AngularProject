import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';

@Component({
  selector: 'api-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private datastore: DatastoreService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.datastore.logout();
  }
}
