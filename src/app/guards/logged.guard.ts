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
import { AuthService } from '@services/personas/auth.service';
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
      this.router.navigate(['/login']);
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
      console.log('sin autenticacion', this.authService.isLogged);
      this.router.navigate(['/login'], {
        queryParams: { redirectURL: state.url },
      });
      return false;
    } else {
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
      this.router.navigate(['/login'], {
        queryParams: { redirectURL: state.url },
      });
      return false;
    } else {
      return true;
    }
  }
}
