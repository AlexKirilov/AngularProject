import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SnackBarI } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {
  private logedIn: boolean;

  constructor() { }

  private errorMsgTypeSource = new BehaviorSubject<object>( { message: '', showMsg: false } );
  errorMsg = this.errorMsgTypeSource.asObservable();

  changeErrorMsg ( error: string ): void {
    this.errorMsgTypeSource.next( {message: error, showMsg: true} );
  }

  // private currentUserSource = new BehaviorSubject<object>({ username: null, token: null });
  // currentUser = this.currentUserSource.asObservable();

  // changeCurrentUser ( user ) {
  //   this.currentUserSource.next( { username: user.username, token: user.token } );
  // }

  // uLogItIn() {
  //   const tmp = localStorage.getItem('currentUser');
  //   this.currentUser.subscribe( result => {
  //      return (tmp === result['username'] && result['token'] );
  //   });
  // }

  // tslint:disable-next-line:member-ordering
  private pathSource = new BehaviorSubject<string>('');
  // tslint:disable-next-line:member-ordering
  newPath = this.pathSource.asObservable();

  changePath(path: string) {
    this.pathSource.next(path);
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
  private snackbarSource = new BehaviorSubject<SnackBarI>({message: '', action: ''});
  // tslint:disable-next-line:member-ordering
  snackbarData = this.snackbarSource.asObservable();

  showSnackBar(data: SnackBarI) {
    this.snackbarSource.next(data);
  }

}
