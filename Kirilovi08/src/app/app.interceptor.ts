import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatastoreService } from './services/datastore.service';

@Injectable()
export class AppAuthInterceptor implements HttpInterceptor {
    constructor(private data: DatastoreService) { }

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

        req = req.clone({ headers: req.headers.set('WebSite', 'ID 5b1042eaf3e2af13cc073c2f') });

        return next.handle(req);
    }
}
