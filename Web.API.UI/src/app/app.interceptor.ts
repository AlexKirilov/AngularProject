import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatastoreService } from './services/datastore.service';

@Injectable()
export class AppAuthInterceptor implements HttpInterceptor {
    constructor (private data: DatastoreService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'token ' + this.data.token)
        });
        return next.handle(authReq);
    }
}
