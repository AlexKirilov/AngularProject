import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {
  private logedIn: boolean;

  constructor() { }

  private errorMsgTypeSource = new BehaviorSubject<object>( { message: '', showMsg: false } );
  errorMsg = this.errorMsgTypeSource.asObservable();

  private currentUserSource = new BehaviorSubject<object>({ username: null, token: null });
  currentUser = this.currentUserSource.asObservable();

  private pathSource = new BehaviorSubject<string>('');
  newPath = this.pathSource.asObservable();

  changeErrorMsg ( error: string ): void {
    this.errorMsgTypeSource.next( {message: error, showMsg: true} );
  }

  changeCurrentUser ( user ) {
    this.currentUserSource.next( { username: user.username, token: user.token } );
  }

  uLogItIn() {
    const tmp = localStorage.getItem('currentUser');
    this.currentUser.subscribe( result => {
       return (tmp === result['username'] && result['token'] );
    });
  }

  changePath(path: string) {
    this.pathSource.next(path);
  }

}
