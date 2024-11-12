import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { opcionesSeleccion } from '@interfaces/opcionesSeleccion';
import { srvResponse } from '@interfaces/response';
import { environment } from '@env/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TextosService {
  @Input() processStatus: string = '';
  constructor(private _http: HttpClient) {}
  /**
   * metodo para obtener a travez de api opciones
   */
  getOpciones(
    contexto: string = '',
    grupo: string = ''
  ): Observable<opcionesSeleccion | any> {
    if (!environment.production) {
      return this._http
        .get<any>(`${environment.SYS_API_URL}/api/diccionario`, {
          params: {
            view: contexto,
            grupo: grupo,
          },
        })
        .pipe(
          map((res) => {
            return res.records.map((m) => m.fields);
          })
        );
    } else {
      return this._http
        .get<srvResponse>(`${environment.API_URL}/api/diccionario/lista`, {
          params: {
            contexto: contexto,
            grupo: grupo,
          },
        })
        .pipe(
          map((res) => {
            return res.data;
          }),
          catchError((err) => {
            return [];
          })
        );
    }
  }
  /**
   * metodo para obetner textos
   */
  getTextos(processName: string): Observable<any> {
    if (!environment.production) {
      console.log('processName', processName);
      return this._http
        .get<any>(`${environment.SYS_API_URL}/api/Texto`, {
          params: {
            view: processName,
          },
        })
        .pipe(
          map((res) => {
            return res.records.map((m) => m.fields);
          })
        );
    } else {
      return this._http
        .get<any>(`${environment.API_URL}/api/Textos/dominio/${processName}`)
        .pipe(
          map((res) => {
            return res.data;
          })
        );
    }
  }
}
