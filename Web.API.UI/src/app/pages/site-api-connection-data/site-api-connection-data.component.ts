import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatastoreService } from '../../services/datastore.service';
import { Unsubscribable } from 'rxjs';
import { interfaceList } from './api-Interfaces';
import { APIRequests } from './api-Requests';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-site-api-connection-data',
  templateUrl: './site-api-connection-data.component.html',
  styleUrls: ['./site-api-connection-data.component.scss']
})
export class SiteApiConnectionDataComponent implements OnInit, OnDestroy {
  public apiCalls: string;
  public apiInterceptor: string;
  public apiInterfaces: string;

  private unscSiteId: Unsubscribable;

  constructor(
    private apiRequests: APIRequests,
    private datastore: DatastoreService,
  ) { }

  ngOnInit() {
    this.getApiRequests();
    this.getInterceptorData();
    this.apiInterfaces = interfaceList;
  }

  ngOnDestroy(): void {
    if (this.unscSiteId) { this.unscSiteId.unsubscribe(); }
  }

  getInterceptorData() {
    this.datastore.getSiteID().subscribe((id: any) => {
      this.apiInterceptor = `
        // The interceptor is used to intercept and attach Authentication data to each query
        // Copy and paste the code to your website to retrieve data from the API.

        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          const token: string = this.data.token;
          const siteData: string = this.data.SiteData;
          const website: string = this.data.WebSite;
          if (token) {
              req = req.clone({ headers: req.headers.set('Authorization', 'token ' + token) });
          }
          if (siteData) {
              req = req.clone({ headers: req.headers.set('SiteData', siteData) });
          }

          // Use this if You are going to use one data for different client(s);
          req = req.clone({ headers: req.headers.set('WebSite', 'ID ${id.sideID}') });

          // Use this if each client need to display different data.
          if (website) {
            req = req.clone({ headers: req.headers.set('WebSite', website) }); }

          return next.handle(req);
      }`;
    });
  }

  getApiRequests() {
    this.apiCalls = `

      ////////////////////////////////////////////////
      ////////////// Authorisation

        ${this.apiRequests.authorisation}

      ////////////////////////////////////////////////
      ////////////// Categories

        ${this.apiRequests.categories}

      ////////////////////////////////////////////////
      ////////////// Products

        ${this.apiRequests.products}

      ////////////////////////////////////////////////
      //////////////// Comments

        ${this.apiRequests.comments}

      ////////////////////////////////////////////////
      ///////////////// Orders

        ${this.apiRequests.orders}

      ////////////////////////////////////////////////
      ///////////////// Gallery

        ${this.apiRequests.gallery}


      ////////////////////////////////////////////////
      ////////////////// Logs

        ${this.apiRequests.logs}
    `;

    /*
    

      ////////////////////////////////////////////////
      //////////////// Invoces //////////////////////
      ////////////////////////////////////////////////

        ${this.apiRequests.invoces}

      ////////////////////////////////////////////////
      ////////////// END Invoces /////////////////////
      ////////////////////////////////////////////////


    */
  }

}