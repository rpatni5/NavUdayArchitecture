import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let isUserAllowed = false;
    isUserAllowed = this.checkUserPermission();
    if (!isUserAllowed) {
      this.router.navigateByUrl('login');
    }
    return isUserAllowed;
  }
  checkUserPermission() {
    let token = localStorage.getItem('access_token');
    return token == null;
  }
}
