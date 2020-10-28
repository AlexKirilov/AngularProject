import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DatastoreService } from '../../services/datastore.service';
import { DatashareService } from '../../services/datashare.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {

  public companyName = 'stressxx';
  public emailSub = 'admin@admin.com';
  public forgotmsg: string = '';
  private emailPattern = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  @ViewChild('callAPIDialog', {static: false}) callAPIDialog: TemplateRef<any>;
  
  constructor(
    private titleService: Title,
    private dialog: MatDialog,
    private datashare: DatashareService,
    private datastore: DatastoreService,
  ) {
    this.titleService.setTitle('Forgot Password');
    this.datashare.changeCurrentPage('forgotpass');
  }

  ngOnInit() {
  }

  resetPass() {
    if (this.companyName && this.companyName !== '' && this.emailSub !== '' && this.emailPattern.test(this.emailSub)) {
      this.datastore.forgotPass({ companyName: this.companyName, email: this.emailSub})
      .pipe(take(1)).subscribe( (data: any) => {
        if (data && data !== '') {
          const str = `?cid=${data.token}&sd=${data.SiteData.replace(' ', '-')}&sid=${data.WebSite.split(' ')[1]}`;
          this.callAPI(str)
        }
      });
    }
  }

  callAPI(str: any) {
    this.forgotmsg = str;
    let dialogRef = this.dialog.open(this.callAPIDialog);
    }

}
