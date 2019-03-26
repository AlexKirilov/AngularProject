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
  ) {  }

  ngOnInit() {
    this.getApiRequests();
    this.getInterceptorData();
    this.apiInterfaces = interfaceList;
  }

  ngOnDestroy(): void {
    if (this.unscSiteId) { this.unscSiteId.unsubscribe(); }
  }

  getInterceptorData() {
    this.datastore.getSiteID().subscribe( (id: any) => {

      this.apiInterceptor = `
        // Your personal Site ID is '${id.siteID}'.
        // Use it to be authorised from the system and to retrieve data.

        // All of the following data is also requirable to authorise a specific client information,
        // But not is not required for basic information such as Products and etc.

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
          req = req.clone({ headers: req.headers.set('WebSite', 'ID ${id.siteID}') });

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
      ////////////// Authorisation ///////////////////
      ////////////////////////////////////////////////

        ${this.apiRequests.authorisation}

      ////////////////////////////////////////////////
      /////////// END Authorisation //////////////////
      ////////////////////////////////////////////////


      
      ////////////////////////////////////////////////
      ////////////// Categories //////////////////////
      ////////////////////////////////////////////////

        ${this.apiRequests.categories}

      ////////////////////////////////////////////////
      /////////// END Categories /////////////////////
      ////////////////////////////////////////////////



      ////////////////////////////////////////////////
      ////////////// Products ////////////////////////
      ////////////////////////////////////////////////

        ${this.apiRequests.products}

      ////////////////////////////////////////////////
      /////////// END Products ///////////////////////
      ////////////////////////////////////////////////



      ////////////////////////////////////////////////
      //////////////// Comments //////////////////////
      ////////////////////////////////////////////////

        ${this.apiRequests.comments}

      ////////////////////////////////////////////////
      ///////////// END Comments /////////////////////
      ////////////////////////////////////////////////



      ////////////////////////////////////////////////
      ///////////////// Orders ///////////////////////
      ////////////////////////////////////////////////

        ${this.apiRequests.orders}

      ////////////////////////////////////////////////
      ////////////// END Orders //////////////////////
      ////////////////////////////////////////////////



      ////////////////////////////////////////////////
      ///////////////// Gallery //////////////////////
      ////////////////////////////////////////////////

        ${this.apiRequests.gallery}

      ////////////////////////////////////////////////
      ////////////// END Gallery /////////////////////
      ////////////////////////////////////////////////



      ////////////////////////////////////////////////
      ////////////////// Logs ////////////////////////
      ////////////////////////////////////////////////

        ${this.apiRequests.logs}

      ////////////////////////////////////////////////
      /////////////// END Logs ///////////////////////
      ////////////////////////////////////////////////

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