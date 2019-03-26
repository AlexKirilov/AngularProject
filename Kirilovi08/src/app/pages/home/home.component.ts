import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../../services/datashare.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private titleService: Title,
    private datashare: DatashareService
    ) {
      this.titleService.setTitle('Home');
      this.datashare.changeCurrentPage('home');
    }

  ngOnInit() {
  }

}
