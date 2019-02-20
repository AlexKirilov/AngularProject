import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DatashareService } from '../../../../services/datashare.service';
import { UITourService } from '../../../../services/ui-tour.service';
import { DashboardTourData } from './site-dashboard.ui-tour-data';
import { Unsubscribable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-site-dashboard',
  templateUrl: './site-dashboard.component.html',
  styleUrls: ['./site-dashboard.component.scss']
})
export class SiteDashboardComponent implements OnInit, OnDestroy {

  private unsubscribePageTour: Unsubscribable;

  constructor(
    private titleService: Title,
    private tourData: DashboardTourData,
    private datashare: DatashareService,
    private uiTourService: UITourService,

  ) {
    this.titleService.setTitle('Dashboard');
    this.datashare.changeCurrentPage('dashboard');
  }

  ngOnInit() {
    this.unsubscribePageTour = this.datashare.pageTourTrigger.subscribe((tourPage) => {
      if (tourPage === 'dashboard') { this.startTour(); }
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribePageTour) { this.unsubscribePageTour.unsubscribe(); }
  }

  startTour() {
    this.uiTourService.startTour(this.tourData.TourSteps, this.tourData.TourRequirements, (selection: string) => {
      this.tourData.onShow(selection);
    });
  }

}
