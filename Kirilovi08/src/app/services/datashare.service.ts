import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {

  constructor() { }

  private errorMsgTypeSource = new BehaviorSubject<object>({ message: '', showMsg: false });
  errorMsg = this.errorMsgTypeSource.asObservable();

  changeErrorMsg(error: string): void {
    this.errorMsgTypeSource.next({ message: error, showMsg: true });
  }

}
