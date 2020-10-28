import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatashareService } from '../services/datashare.service';

@Component({
  selector: 'api-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit, OnDestroy{
  public contentLoader: Observable<boolean>;
  public htmlLoader: Observable<boolean>;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private datashare: DatashareService,
    public translate: TranslateService
  ) {
    this.translate.addLangs(['bg', 'en']);
    this.translate.setDefaultLang('bg');
    this.translate.use('bg');
  }

  ngOnInit(): void {
    this.contentLoader = this.datashare.spinnerContent.pipe(takeUntil(this.destroy$))
    this.htmlLoader = this.datashare.spinnerHMTL.pipe(takeUntil(this.destroy$))
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  
}
