import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  public data: any = [];
  constructor(private _http: HttpClient) {}
  /**
   * metodo que obtiene todos los elementos del api
   * @param endpoint
   * @param Qparams
   * @returns
   */
  getAll(endpoint: string, Qparams: any): Observable<any> {
    return this._http
      .get<any>(`${environment.API_URL}/${endpoint}`, {
        params: Qparams,
        observe: 'response',
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  /**
   * metodo que actualiza los elementos del api
   * @param endpoint
   * @param id
   * @param payload
   * @returns
   */
  updateItem(endpoint: string, id: string, payload: any): Observable<any> {
    return this._http
      .patch<any>(`${environment.API_URL}/${endpoint}/${id}/update`, payload, {
        observe: 'response',
      })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  /**
   * metodo que obtiene un elemetno
   * @returns
   */
  getItems(endpoint: string): Observable<any> {
    return this._http.get<any>(`${environment.API_URL}${endpoint}`).pipe(
      map((data) => {
        return data;
      })
    );
  }
  /**
   * metodo que elimina un elemento del api
   * @param endpoint
   * @param id
   * @returns
   */
  deleteItem(endpoint: string, id: string): Observable<any> {
    return this._http
      .delete<any>(`${environment.API_URL}/${endpoint}/${id}`, {
        observe: 'response',
      })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  getSome(endpoint: string, params: any = []): Observable<any> {
    return this._http
      .get<any>(`${environment.API_URL}/${endpoint}`, {
        params: params,
        observe: 'response',
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  /**
   * metodo que envia un elemento al api
   * @param endpoint
   * @param payload
   * @returns
   */
  sendItem(endpoint: string, payload: any): Observable<any> {
    return this._http
      .post<any>(`${environment.API_URL}/${endpoint}`, payload, {
        observe: 'response',
      })
      .pipe(
        map((data) => {
          console.log(data, 'data');
          return data;
        })
      );
  }
}
