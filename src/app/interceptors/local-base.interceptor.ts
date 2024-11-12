import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalBaseService } from '@services/local-base.service';
import { ToastComponent } from '@notifications/toast/toast.component';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable()
export class LocalbaseInterceptor implements HttpInterceptor {
  onlyMethods = ['POST', 'PUT', 'PATCH'];
  constructor(private lb: LocalBaseService, private toast: ToastComponent) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e instanceof HttpErrorResponse) {
          /**
           * comprobar si el metodo http cumple con los métodos declarado arriba
           */
          const supportedMethod = this.onlyMethods.includes(req.method);
          if (supportedMethod) {
            // captura del endpoint
            const apiUrl = req.url;
            // captura del cuerpo que se está enviando
            const body = req.body;
            // captura del dataSetName
            const datasetName = 'DOI';
            // const datasetName = body.meta.attempts.datasetName;
            //  agregar attempts por cada intento
            if (!body.meta.attempts || body.meta.attempts.length === 0) {
              body.meta.attempts = [];
            }
            const item = {
              date: new Date().toLocaleDateString(),
              msg: e.message,
              code: e.status,
            };
            body.meta.attempts.push(item);
            const key = body['key'];
            // agregamos los datos a la base de datos local del navegador
            this.lb.isNewItem(datasetName, apiUrl, body, key);
            this.toast.open(
              'Parece no haber conexion a internet, se enviará más tarde'
            );
          }
        }
        return throwError(() => new Error('Error de Internet'));
      })
    );
  }
}
