import { ApiService } from './api.service';
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private api: ApiService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Checking if ise is Logged in,
    const isAuth = this.api.userIsLogged();
    if (isAuth) {
      return true;
    }
    // Navigating to login if user is not logged in
    return this.router.navigate(['signin']);
  }
}
