import { Component, OnInit } from '@angular/core';
import { DatashareService } from 'src/app/services/datashare.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(
    private titleService: Title,
    private datashare: DatashareService
    ) {
      this.titleService.setTitle('About Us');
      this.datashare.changeCurrentPage('about-us');
    }

  ngOnInit() {
  }

}
