import { Injectable } from '@angular/core';
import {
  CanActivate,
  // CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  RouterStateSnapshot,
  UrlTree,
  Router,
  // ActivatedRoute,
  ActivatedRouteSnapshot,
} from '@angular/router';
// import { User } from '@interfaces/user.interface';
import { ExcepcionService } from '@services/excepciones/excepcion.service';
import { AuthService } from '@services/personas/auth.service';
// import { ProcesosService } from '@services/procesos.service';
import {
  Observable,
  // Subject,
  Subscription,
} from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
export interface aclResponse {
  active: boolean;
  authorized: boolean;
}
export interface errResponse {
  status: string;
  message: string;
}
class UserToken {}
class Permissions {
  canActivate(): boolean {
    return true;
  }
}

@Injectable()
class CanActivateTeam implements CanLoad, CanActivate {
  public subscription: Subscription = new Subscription();
  constructor(
    private permissions: Permissions,
    private currentUser: UserToken,
    private excepcionService: ExcepcionService,
    private authService: AuthService,
    private router: Router
  ) {}
  user: number | void;
  protected existeExcepcion: boolean = false;
  protected permiteExcepcion: boolean = true;
  protected permiteRol: boolean = false;
  protected motivo: string = '';
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (!this.authService.isLogged) {
      this.user = this.authService.getUser();
      this.router.navigate(['login']);
      return false;
    } else {
      if (
        route.data['permitirRoles'] &&
        route.data['permitirRoles'].length > 0
      ) {
        let rolesPuedenAcceder = route.data['permitirRoles'];
        console.log('rolesPuedenAcceder', rolesPuedenAcceder);
        rolesPuedenAcceder.push('Super Users');
        let rolesUsuario = this.authService.getRol().map((r) => r.title); //aliniear los grupos del usuario
        console.log('rolesUsuario', rolesUsuario);
        var filteredArray = rolesPuedenAcceder.filter(function (n) {
          return rolesUsuario.indexOf(n) !== -1;
        });
        console.log('filteredArray', filteredArray);
        if (filteredArray.length > 0) {
          console.log('pertenece uno o más grupos permitidos', filteredArray);
          this.motivo = 'pertenece';
          this.permiteRol = true;
        } else {
          this.motivo = 'no pertenece';
          console.log('no pertence ningun grupo permitido');
          this.router.navigate(['401']);
          this.permiteRol = false;
        }
      } else {
        console.log(
          'Al no estar mencioando se deberia permitir a cualquiera logeado'
        );
        this.motivo = 'no existen roles especificos';
        this.permiteRol = true;
      }
      console.log('this.permiteRol', this.permiteRol);
      console.log('motivo', this.motivo);
      return this.permiteRol;
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
    console.log('canActiva state', state);
    let code = cleanURL(state.url);
    console.log('can Activate code', code);
    if (!this.authService.isLogged) {
      this.user = this.authService.getUser();
      this.router.navigate(['login']);
      return false;
    } else {
      if (route.data['revisarExcepciones']) {
        this.subscription.add(
          this.excepcionService.getExcepcion(code).subscribe((data) => {
            /*contesta si el usuario especificio puede acceder o no basado en la excepcion */
            this.existeExcepcion = getBoolean(data?.existeRegistro);
            this.permiteExcepcion = getBoolean(data?.puedeAcceder);
          })
        );
      } else {
        console.log(
          'No existe excepcion, por lo que se deja actual al sistema en si'
        );
        this.existeExcepcion = false;
        this.permiteExcepcion = true;
      }
      if (this.permiteExcepcion) {
        console.log('permite la excepcion');
        return true;
      } else {
        this.router.navigate(['403']);
        return false;
      }
    }
  }
}
function getBoolean(value: any) {
  switch (value) {
    case true:
    case 'true':
    case 1:
    case '1':
    case 'on':
    case 'yes':
      return true;
    default:
      return false;
  }
}
function cleanURL(value: string) {
  return value
    .replace(/^\/|\/$/g, '')
    .split('/')
    .join('-')
    .toLowerCase();
}
