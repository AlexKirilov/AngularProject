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

  // tslint:disable-next-line:member-ordering
  private spinnerWrapperSource = new BehaviorSubject<boolean>(false);
  // tslint:disable-next-line:member-ordering
  spinnerWrapper = this.spinnerWrapperSource.asObservable();

  showSpinnerWrapper(bool: boolean) {
    this.spinnerWrapperSource.next(bool);
  }

  // tslint:disable-next-line:member-ordering
  private spinnerBodySource = new BehaviorSubject<boolean>(false);
  // tslint:disable-next-line:member-ordering
  spinnerContent = this.spinnerBodySource.asObservable();

  showSpinnerContent(bool: boolean) {
    this.spinnerBodySource.next(bool);
  }

  // tslint:disable-next-line:member-ordering
  private spinnerHMTLSource = new BehaviorSubject<boolean>(false);
  // tslint:disable-next-line:member-ordering
  spinnerHMTL = this.spinnerHMTLSource.asObservable();

  showSpinnerHTML(bool: boolean) {
    this.spinnerHMTLSource.next(bool);
  }

  //////////////   SNACK BAR    //////////////
  // tslint:disable-next-line:member-ordering
  private snackbarSource = new BehaviorSubject<SnackBarI>({ message: '', action: '' });
  // tslint:disable-next-line:member-ordering
  snackbarData = this.snackbarSource.asObservable();

  showSnackBar(data: SnackBarI) {
    this.snackbarSource.next(data);
  }

  //////////////   IfAdmin    //////////////
  // tslint:disable-next-line:member-ordering
  private ifAdminSource = new BehaviorSubject<Boolean>(false);
  // tslint:disable-next-line:member-ordering
  ifAdmin = this.ifAdminSource.asObservable();

  showIfAdmin(is: Boolean) {
    this.ifAdminSource.next(is);
  }

  // tslint:disable-next-line:member-ordering
  private ifUserSource = new BehaviorSubject<Boolean>(false);
  // tslint:disable-next-line:member-ordering
  ifUser = this.ifUserSource.asObservable();

  showIfUser(is: Boolean) {
    this.ifUserSource.next(is);
  }

  // tslint:disable-next-line:member-ordering
  private basketSource = new BehaviorSubject<Array<object>>([]);
  // tslint:disable-next-line:member-ordering
  getBasket = this.basketSource.asObservable();

  changeBasket(basket: Array<object>) {
    this.basketSource.next(basket);
  }

  // tslint:disable-next-line:member-ordering
  private persDiscountSource = new BehaviorSubject<number>(0);
  // tslint:disable-next-line:member-ordering
  getDiscount = this.persDiscountSource.asObservable();

  changeDiscount(discount: number) {
    this.persDiscountSource.next(discount);
  }


  // tslint:disable-next-line:member-ordering
  private currentPageSource = new BehaviorSubject<string>('home');
  // tslint:disable-next-line:member-ordering
  currentPage = this.currentPageSource.asObservable();

  // Check if Modal Handler is already used
  changeCurrentPage(element: string): void {
    this.currentPageSource.next(element);
  }
}

export class SnackBarI {
  message: string;
  action: string;
}
