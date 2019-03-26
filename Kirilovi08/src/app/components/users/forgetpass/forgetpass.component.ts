import { Component, OnInit } from '@angular/core';
import { DatashareService } from 'src/app/services/datashare.service';
import { Title } from '@angular/platform-browser';
import { DatastoreService } from 'src/app/services/datastore.service';
import { ModalHandlerService } from 'src/app/services/modal-handler.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.scss']
})
export class ForgetpassComponent implements OnInit {
  
  public emailSub = '';
  public companyName = '';
  private emailPattern = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  constructor(
    private titleService: Title,
    private datashare: DatashareService,
    private datastore: DatastoreService,
    private modalHandler: ModalHandlerService,
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
          this.modalHandler.openDialogReset(str);
        }
      });
    }
  }
}
