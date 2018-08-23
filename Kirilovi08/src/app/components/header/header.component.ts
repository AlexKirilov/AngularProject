import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../../services/datashare.service';
import { DatastoreService } from '../../services/datastore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUser;
  username: String;
  constructor(
    private datashare: DatashareService,
    private datastore: DatastoreService,
  ) {
    this.datashare.ifUser.subscribe( (bool) => {
      this.isUser = bool;
      this.username = this.datastore.Username;
    });
  }

  ngOnInit() {
  }

}
