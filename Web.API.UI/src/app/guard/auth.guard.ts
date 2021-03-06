import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DatastoreService } from '../services/datastore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private datastore: DatastoreService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // tslint:disable-next-line:no-unused-expression
    (!!this.datastore.token) ? '' : this.router.navigate(['/auth/login']);
      return !!this.datastore.token;
  }
}
