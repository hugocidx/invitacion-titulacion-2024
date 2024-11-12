import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoaderService } from '@services/loader.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService) {}
  intercept(0
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(request).pipe(
      retry(0),
      /* take(5),
      finalize(() => {
        console.log('finaliza??'),
        this.loaderService.hide()
      }), */
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'error';
        let errorMessage404 =
          'La URL solicitada no se encontró en este servidor';
        switch (error.status) {
          case 401:
            // no está autorizado
            break;
          case 403:
            // acceso prohibido
            break;
          case 404:
            alert(errorMessage404);
            // acceso prohibido
            break;
          case 405:
            errorMessage =
              error.error instanceof ErrorEvent
                ? `Error: ${error.error.message}`
                : `Error Status: ${error.status}\nMessage: ${error.message}`;
            return throwError(
              () => new Error('error no se puede mostrar el error')
            );
        }
        return throwError(() => {
          new Error('Error de algún tipo');
        });
      })
    );
  }
}
