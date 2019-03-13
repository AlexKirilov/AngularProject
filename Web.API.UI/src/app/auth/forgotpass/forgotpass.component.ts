import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { HandleErrorsService } from '../../services/handle-errors.service';
import { Title } from '@angular/platform-browser';
import { DatashareService } from '../../services/datashare.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {

  public emailSub = 'admin@admin.com';
  public companyName = 'stressxx';
  private emailPattern = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  constructor(
    private titleService: Title,
    private datashare: DatashareService,
    private datastore: DatastoreService,
    private errorHandler: HandleErrorsService,
  ) {
    this.titleService.setTitle('Forgot Password');
    this.datashare.changeCurrentPage('forgotpass');
  }

  ngOnInit() {
  }

  resetPass() {
    if (this.companyName && this.companyName !== '' && this.emailSub !== '' && this.emailPattern.test(this.emailSub)) {
      this.datastore.forgotPass({ companyName: this.companyName, email: this.emailSub}).subscribe( (data: any) => {
        if (data && data !== '') {
          const str = `?cid=${data.token}&sd=${data.SiteData.replace(' ', '-')}&sid=${data.WebSite.split(' ')[1]}`;
          this.errorHandler.openDialogReset(str);
        }
      });
    }
  }

}
