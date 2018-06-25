import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  deleteme;
  constructor(private router: Router) { }
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.deleteme = localStorage.getItem('token');
    (this.deleteme && this.deleteme.trim() != '') ? '' : this.router.navigate(['/login']);
    return !!this.deleteme;
  }
}
