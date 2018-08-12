import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '../../../node_modules/@angular/router';
import { DatastoreService } from './datastore.service';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {

  constructor(
    private router: Router,
  ) { }

  private errorMsgTypeSource = new BehaviorSubject<object>({ message: '', showMsg: false });
  errorMsg = this.errorMsgTypeSource.asObservable();

  changeErrorMsg(error: string): void {
    this.errorMsgTypeSource.next({ message: error, showMsg: true });
  }

  changeURLParams(propertyObj = {}) {
    for (const item in propertyObj) {
      if (propertyObj.hasOwnProperty(item) && propertyObj[item] === '') {
        propertyObj[item] = null;
      }
    }
    const urlTree = this.router.createUrlTree([], {
      queryParams: propertyObj,
      queryParamsHandling: 'merge',
      preserveFragment: true
    });

    this.router.navigateByUrl(urlTree);
  }

  ///////////// Loader / Spinner /////////////

  // Start Spinners
  startSpinnerWrapper() { this.showSpinnerWrapper(true); }
  startSpinnerContent() { this.showSpinnerContent(true); }
  startSpinnerHTML() { this.showSpinnerHTML(true); }
  // Stop Spinner
  stopSpinnerWrapper() { this.showSpinnerWrapper(false); }
  stopSpinnerContent() { this.showSpinnerContent(false); }
  stopSpinnerHTML() { this.showSpinnerHTML(false); }

  private spinnerWrapperSource = new BehaviorSubject<boolean>(false);
  spinnerWrapper = this.spinnerWrapperSource.asObservable();

  showSpinnerWrapper(bool: boolean) {
    this.spinnerWrapperSource.next(bool);
  }

  private spinnerBodySource = new BehaviorSubject<boolean>(false);
  spinnerContent = this.spinnerBodySource.asObservable();

  showSpinnerContent(bool: boolean) {
    this.spinnerBodySource.next(bool);
  }

  private spinnerHMTLSource = new BehaviorSubject<boolean>(false);
  spinnerHMTL = this.spinnerHMTLSource.asObservable();

  showSpinnerHTML(bool: boolean) {
    this.spinnerHMTLSource.next(bool);
  }

  //////////////   SNACK BAR    //////////////
  private snackbarSource = new BehaviorSubject<SnackBarI>({ message: '', action: '' });
  snackbarData = this.snackbarSource.asObservable();

  showSnackBar(data: SnackBarI) {
    this.snackbarSource.next(data);
  }

  //////////////   IfAdmin    //////////////
  private ifAdminSource = new BehaviorSubject<Boolean>(false);
  ifAdmin = this.ifAdminSource.asObservable();

  showIfAdmin(is: Boolean) {
    this.ifAdminSource.next(is);
  }

  private ifUserSource = new BehaviorSubject<Boolean>(false);
  ifUser = this.ifUserSource.asObservable();

  showIfUser(is: Boolean) {
    this.ifUserSource.next(is);
  }

}

export class SnackBarI {
  message: string;
  action: string;
}
