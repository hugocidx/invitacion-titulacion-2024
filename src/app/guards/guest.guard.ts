import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@services/personas/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private AuthScv: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.AuthScv.isLogged.pipe(
      take(1),
      map((isLogged: boolean) => !isLogged)
    );
  }
}
