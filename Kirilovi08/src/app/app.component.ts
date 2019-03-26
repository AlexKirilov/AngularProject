import { Component, OnDestroy, ElementRef } from '@angular/core';
import { DatashareService } from './services/datashare.service';
import { MatSnackBar } from '../../node_modules/@angular/material';
import { DatastoreService } from './services/datastore.service';
import { Unsubscribable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  contentLoader: boolean;
  wrapperLoader: boolean;
  modalWindow: boolean;
  htmlLoader: boolean;

  private body = document.body.style;
  private unscSnackBar: Unsubscribable;
  private unscSpinnerHMTL: Unsubscribable;
  private unscSpinnerWrapper: Unsubscribable;
  private unscSpinnerContent: Unsubscribable;

  constructor(
    private snackBar: MatSnackBar,
    private datastore: DatastoreService,
    private datashare: DatashareService
  ) {

    this.datashare.showIfUser(this.datastore.Username !== '' && this.datastore.Username !== null);
    this.datastore.checkUser();
    // tslint:disable-next-line:no-unused-expression
    this.unscSpinnerHMTL = this.datashare.spinnerHMTL.subscribe(bool => this.htmlLoader = bool);
    this.unscSpinnerWrapper = this.datashare.spinnerWrapper.subscribe(bool => this.wrapperLoader = bool);
    this.unscSpinnerContent = this.datashare.spinnerContent.subscribe(bool => this.contentLoader = bool);
    this.unscSnackBar = this.datashare.snackbarData.subscribe(data => this.openSnackBar(data.message, data.action));

    this.backgroundChange();
  }

  ngOnDestroy(): void {
    if (this.unscSnackBar) { this.unscSnackBar.unsubscribe(); }
    if (this.unscSpinnerHMTL) { this.unscSpinnerHMTL.unsubscribe(); }
    if (this.unscSpinnerWrapper) { this.unscSpinnerWrapper.unsubscribe(); }
    if (this.unscSpinnerContent) { this.unscSpinnerContent.unsubscribe(); }
  }

  openSnackBar(message: string, action: string) {
    if (message !== '') {
      this.snackBar.open(message, action, {
        duration: 4000,
      });
    }
  }

  backgroundChange() {
    let counter = 0;
    const timer = 60 * 60 * 30;
    // tslint:disable-next-line: no-use-before-declare
    const max = bodyBgList.length - 1;
    setInterval(() => {
      // tslint:disable-next-line: no-use-before-declare
      this.body.background = `url('${bodyBgList[counter]}')`;
      counter < max ? ++counter : counter = 0;
    }, timer);
  }
}

export const bodyBgList = [
  // `https://images.pexels.com/photos/236478/pexels-photo-236478.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`,
  // `https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`,
  // `https://images.pexels.com/photos/442407/summer-sunset-meadow-nature-442407.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`,
  `https://images.pexels.com/photos/259280/pexels-photo-259280.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`,
  `https://images.pexels.com/photos/1227513/pexels-photo-1227513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`,
  `https://images.pexels.com/photos/51947/tuscany-grape-field-nature-51947.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`,
  `https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`,
  `https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`,
  `https://images.pexels.com/photos/325944/pexels-photo-325944.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260`,
]