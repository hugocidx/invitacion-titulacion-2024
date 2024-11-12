import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private _http: HttpClient) {}
  /**
   * obtiene elementos de la lista menu
   * @param ubicacion
   * @returns
   */
  getItems(ubicacion: string = 'principal'): Observable<HttpResponse<any>> {
    const QueryParam = {
      format: 'table', // list | table |
      // SQL WHERE_
      ubicacion: ubicacion,
      //deleted: 'none', // | 'only' | 'whith'
      //SQL ---
      order_by: 'orden',
      direction: 'ASC',
      //limit: 15,
    };
    return this._http
      .get<any>(`${environment.API_URL}/api/v1/menu`, {
        params: QueryParam,
        observe: 'response',
      })
      .pipe(
        map((response: any) => {
          return response.body;
        })
      );
  }
}
