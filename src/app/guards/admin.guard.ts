// // import { Route } from '@angular/compiler/src/core';
// import { Injectable } from '@angular/core';
// import {
//   CanActivateChild,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   UrlTree,
//   CanLoad,
//   UrlSegment,
// } from '@angular/router';
// import { AuthService } from '@services/personas/auth.service';
// import { Observable } from 'rxjs';
// @Injectable({
//   providedIn: 'root',
// })
// export class AdminGuard implements CanActivateChild, CanLoad {
//   constructor(private authService: AuthService) {
//     // this.AuthService.checkToken();
//   }
//   canActivateChild(
//     childRoute: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     //console.log('canActivateChild Admin')

//     //if(!!this.AuthService.getToken()) return false

//     var roles = this.authService.getRol();
//     if (!roles) return false;

//     //console.log('roles as array',roles)
//     if (roles.find((x: any) => x.title === 'Super Users')) {
//       //console.log(roles)
//       //localStorage.setItem('guardA','true')
//       return true;
//     } else {
//       alert('No tiene acceso a este contenido');
//       return false;
//     }
//   }
//   // canLoad(
//   //   route: Route,
//   //   segments: UrlSegment[]
//   // ): Observable<boolean> | Promise<boolean> | boolean {
//   //   //console.log('canLoad Admin')

//   //   //  if(!!this.AuthService.getToken()) return false

//   //   var roles = this.authService.getRol();

//   //   if (!roles) return false;
//   //   if (roles.find((x) => x.title === 'Super Users')) {
//   //     //console.log(roles)
//   //     //localStorage.setItem('guardA','true')
//   //     return true;
//   //   } else {
//   //     alert('No tiene acceso a este contenido');
//   //     return false;
//   //   }
//   // }
// }
