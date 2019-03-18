import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../../services/datashare.service';
import { DatastoreService } from '../../services/datastore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private datashare: DatashareService, private datastore: DatastoreService) { }

  ngOnInit() {
  }

}
