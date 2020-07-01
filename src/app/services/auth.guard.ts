import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';
import { tokens } from '../tokens/token';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(
    private securityService: SecurityService,
    private router: Router, private token: tokens,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let claimType: String = next.data['claimType']; // este dato viene de app.routing

      let  isAuthenticated: Boolean = Boolean(this.token.isAuthenticated());
      // if (this.service.securityObject.isAuthenticated && this.service.hasClaim(claimType)) {
      if (isAuthenticated && this.securityService.hasClaim(claimType)) {
        return true;
      } else {
        this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
        return true;
      }
  }

}
