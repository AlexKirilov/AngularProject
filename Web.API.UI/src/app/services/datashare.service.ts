import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SnackBarI} from '../app.model';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class DatashareService {

  spinnerCountDown = 90;
  timercountdown: any;

  constructor(private router: Router) {}

  private logedIn: boolean;
  private currentTourPage: string;

  private errorMsgTypeSource = new BehaviorSubject<object>({message: '', showMsg: false});
  errorMsg = this.errorMsgTypeSource.asObservable();

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

  // tslint:disable-next-line:member-ordering
  private spinnerWrapperSource = new BehaviorSubject<boolean>(false);
  // tslint:disable-next-line:member-ordering
  spinnerWrapper = this.spinnerWrapperSource.asObservable();

  // tslint:disable-next-line:member-ordering
  private spinnerBodySource = new BehaviorSubject<boolean>(false);
  // tslint:disable-next-line:member-ordering
  spinnerContent = this.spinnerBodySource.asObservable();

  // tslint:disable-next-line:member-ordering
  private spinnerHMTLSource = new BehaviorSubject<boolean>(false);
  // tslint:disable-next-line:member-ordering
  spinnerHMTL = this.spinnerHMTLSource.asObservable();

  private spinnerModelWindowSource = new BehaviorSubject<boolean>(false);
  spinnerModal = this.spinnerModelWindowSource.asObservable();

  // tslint:disable-next-line:member-ordering
  private currentPageSource = new BehaviorSubject<string>('home');
  // tslint:disable-next-line:member-ordering
  currentPage = this.currentPageSource.asObservable();

  //////////////   SNACK BAR    ////////
  // tslint:disable-next-line:member-ordering
  private snackbarSource = new BehaviorSubject<SnackBarI>({message: '', action: ''});
  // tslint:disable-next-line:member-ordering
  snackbarData = this.snackbarSource.asObservable();

  ///////////// Trigger UI Tour ///////
  // tslint:disable-next-line:member-ordering
  private triggerTourSource = new BehaviorSubject<string>(null);
  // tslint:disable-next-line:member-ordering
  pageTourTrigger = this.triggerTourSource.asObservable();

  // Full Tour Tracker
  private changeTourPageSource = new BehaviorSubject<any>(null);

  // Change Role type
  // tslint:disable-next-line:member-ordering
  private userLoggedInSource = new BehaviorSubject<boolean>(true);
  userLoggedIn = this.userLoggedInSource.asObservable();

  // Check if Error Handler is already used
  private openErrorSource = new BehaviorSubject<boolean>(false);
  isErrorHandleDisplayed = this.openErrorSource.asObservable();

  changeErrorMsg(error: string): void {
    this.errorMsgTypeSource.next({message: error, showMsg: true});
  }

  changePath(path: string) {
    this.pathSource.next(path);
  }

  changeIsUserLoggedIn(bool: boolean): void {
    this.userLoggedInSource.next(bool);
  }

  ///////////// Loader / Spinner ///////

  emergancySpinnerStop() {
    this.timercountdown = setInterval(() => {
      if (this.spinnerCountDown === 1) {
        this.stopSpinnerContent();
        this.stopSpinnerWrapper();
        this.stopSpinnerHTML();
        clearInterval(this.timercountdown);
        this.showSnackBar({message: 'There is a issue with loading the data', action: 'Try again later!'});
      } else {
        this.spinnerCountDown--;
      }
    }, 1000);
    clearInterval(this.timercountdown);
  }

  stopSpinnerCoundDown() {
    clearInterval(this.timercountdown);
  }

  // Start Spinners
  startSpinnerWrapper() {
    this.showSpinnerWrapper(true);
    this.emergancySpinnerStop();
  }
  startSpinnerContent() {
    this.showSpinnerContent(true);
    this.emergancySpinnerStop();
  }
  startSpinnerHTML() {
    this.showSpinnerHTML(true);
    this.emergancySpinnerStop();
  }
  startSpinnerModal() {
    this.showSpinnerModal(true);
    this.emergancySpinnerStop();
  }

  // Stop Spinner
  stopSpinnerWrapper() {
    this.showSpinnerWrapper(false);
    this.stopSpinnerCoundDown();
  }
  stopSpinnerContent() {
    this.showSpinnerContent(false);
    this.stopSpinnerCoundDown();
  }
  stopSpinnerHTML() {
    this.showSpinnerHTML(false);
    this.stopSpinnerCoundDown();
  }
  stopSpinnerModal() {
    this.showSpinnerModal(false);
    this.stopSpinnerCoundDown();
  }

  showSpinnerModal(bool: boolean) {
    this.spinnerModelWindowSource.next(bool);
  }

  showSpinnerWrapper(bool: boolean) {
    this.spinnerWrapperSource.next(bool);
  }

  showSpinnerContent(bool: boolean) {
    this.spinnerBodySource.next(bool);
  }

  showSpinnerHTML(bool: boolean) {
    this.spinnerHMTLSource.next(bool);
  }

  // Check if Modal Handler is already used
  changeCurrentPage(element: string): void {
    this.currentTourPage = element;
    this.currentPageSource.next(element);
    if (document.body.classList.contains('full-tour')) {
      this.triggerTourSource.next(element);
    }
  }

  showSnackBar(data: SnackBarI) {
    this.snackbarSource.next(data);
  }

  startUITour(t: string): void {
    this.triggerTourSource.next(this.currentTourPage);
  }

  changeTourPage(): void {
    // switch (this.currentTourPage) {
    //   case 'home':
    //     this.router.navigate(['/reports']);
    //     this.startUITour('');
    //     break;
    //   case 'reports':
    //     this.router.navigate(["/v-clients"]);
    //     this.startUITour('');
    //     break;
    //   case 'v-clients':
    //     document.body.classList.remove('full-tour');
    //     this.router.navigate(['/home']);
    //     break; // this.router.navigate(['/about-us']); this.startUITour(''); break;
    //   case 'about-us':
    //     this.router.navigate(["/customise"]);
    //     this.startUITour("");
    //     break;
    //   case "customise":
    //     document.body.classList.remove("full-tour");
    //     this.router.navigate(["/home"]);
    //     break;
    // }
  }

    changeIsErrorHandler(bool: boolean): void {
      this.openErrorSource.next(bool);
    }
}
