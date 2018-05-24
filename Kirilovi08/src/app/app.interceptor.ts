import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatastoreService } from './services/datastore.service';

@Injectable()
export class AppAuthInterceptor implements HttpInterceptor {
    constructor(private data: DatastoreService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string = this.data.token;
        let siteData: string = this.data.SiteData;
        let website: string = this.data.WebSite;
        if (token)
            req = req.clone({ headers: req.headers.set('Authorization', 'token ' + token) });
        if (siteData)
            req = req.clone({ headers: req.headers.set('SiteData', siteData) });
        if (website)
            req = req.clone({ headers: req.headers.set('WebSite', website) });

        return next.handle(req);
    }
}
