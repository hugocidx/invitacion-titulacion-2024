import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Route,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '@services/auth.service';
import { environment } from '@env/environment';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  private subscription: Subscription = new Subscription();
  isLogged: any;

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    this.subscription.add(
      this.authService.isLogged.subscribe((res) => (this.isLogged = res))
    );

    if (!this.isLogged) {
      console.log('sin autenticacion', this.authService.isLogged);
      this.router.navigate([environment.SSO_URI]);
      return false;
    } else {
      return true;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.subscription.add(
      this.authService.isLogged.subscribe((res) => (this.isLogged = res))
    );

    if (!this.isLogged) {
      console.log('environment.SSO_URI;', environment.SSO_URI);
      document.location.href = environment.SSO_URI;
      return false;
    } else {
      console.log('true', true);
      return true;
    }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.subscription.add(
      this.authService.isLogged.subscribe((res) => (this.isLogged = res))
    );

    if (!this.isLogged) {
      console.log('sin autenticacion can Child', this.authService.isLogged);
      document.location.href = environment.SSO_URI;
      return false;
    } else {
      console.log('true', true);
      return true;
    }
  }
}
