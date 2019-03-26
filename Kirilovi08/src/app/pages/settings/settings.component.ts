import { Component, OnInit } from '@angular/core';
import { DatashareService } from 'src/app/services/datashare.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private titleService: Title,
    private datashare: DatashareService,
  ) {
    this.titleService.setTitle('Account Settings');
    this.datashare.changeCurrentPage('settings');
  }

  ngOnInit() {
  }

}
