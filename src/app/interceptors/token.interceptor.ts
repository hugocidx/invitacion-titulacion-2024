import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token: any | undefined;
  constructor(private injector: Injector) {}
  /**
   * El metodo intercepta la llamada y agregar el token para su posterior proceso por el servidor,
   * en el token se esta enviado el usuario, los grupos se vuelven a revisar en el servidor.
   * TODO
   * Puede ser un problema con las llamadas de archivos?
   * @param req
   * @param next
   * @returns
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      return next.handle(req);
    } else {
      let request = req.clone({
        setHeaders: {
          Authorization: `${this.token}`,
          'Content-Type': 'application/json; charset=utf-8;',
          Accept: 'application/json',
        },
      });
      return next.handle(request);
    }
  }
}
