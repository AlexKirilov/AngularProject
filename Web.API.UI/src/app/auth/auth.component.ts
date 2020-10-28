import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'api-auth',
  templateUrl: './auth.component.html',
  styleUrls: []
})
export class AuthComponent {

  constructor(
    public translate: TranslateService
  ) {
    this.translate.addLangs(['bg', 'en']);
    this.translate.setDefaultLang('bg');
    this.translate.use('bg');
  }
}
