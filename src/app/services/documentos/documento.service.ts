import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * interfaz documentos service
 */
interface documentoResponse {
  id: number;
  objeto: string;
  objeto_id: number;
  tag?: string;
  categoria: number;
  titulo: string;
  owner_id: number;
  access?: string;
  privado?: boolean;
  n_visto: number;
  n_descarga: number;
  file_name: string;
  file_type: string;
  file_path: string;
  full_path: string;
  raw_name: string;
  orig_name: string;
  client_name: string;
  file_ext: string;
  file_size?: number;
  is_image?: boolean;
  image_width?: number;
  image_height?: number;
  image_type?: string;
  image_size_str?: string;
  created_by?: number;
  created_from?: string;
  created?: Date;
  in_s3?: boolean;
  s3_path?: string;
}
export interface ErrorRersonse {
  status: string;
  error: string;
  message?: string;
}
@Injectable({
  providedIn: 'root',
})
export class DocumentosService {
  constructor(private http: HttpClient) {}
  /**
   * metodo que trae un elemento del api
   * @param objeto_id
   * @returns
   */
  getItem(objeto_id: string): Observable<any | ErrorRersonse | void> {
    return this.http
      .get<any>(`${environment.API_URL}/Documentos/ver/${objeto_id}`)
      .pipe(
        map((res: any | ErrorRersonse) => {
          console.log('res', res);
          //aqui falta control de identidad y token
          return res;
        })
      );
  }
  /**
   * obtiene items
   * @param params
   * @returns
   */
  getItems(params: any): Observable<any | ErrorRersonse | void> {
    const queryParams = {
      contexto: params['contexto'],
      objeto: params['objeto'],
      objeto_id: params['objeto_id'],
    };
    return this.http
      .get<any>(`${environment.API_URL}/doc/Archivos`, { params: queryParams })
      .pipe(
        map((res: any | ErrorRersonse) => {
          return res;
        })
      );
  }
  /**
   * metodo que obtiene una lista
   * @param objeto
   * @returns
   */
  getList(objeto: string): Observable<any | void> {
    return this.http
      .get<documentoResponse>(`${environment.API_URL}/Documentos/${objeto}`)
      .pipe(
        map((res: any) => {
          //console.log('response',res)
          // localStorage.setItem('rol',JSON.stringify(res.rol))
          //  localStorage.setItem('username',JSON.stringify(res.name))
          // localStorage.setItem('uid',JSON.stringify(res.userId))
          //this.saveStorage(res.token)
          // this.loggedIn.next(true)
          return res;
        })
      );
  }
  /**
   * metodo que actualiza un elemento del api
   * @param postData
   * @returns
   */
  Actualizar(postData: any): Observable<any> {
    console.log('actualizar Documento de .. ', postData);
    return this.http
      .post<any>(`${environment.API_URL}/Documentos/actualizar/`, postData)
      .pipe(
        map((data) => {
          console.log('responseService', data);
          return data;
        })
      );
  }
  /**
   * metodo para cargar un archivo al api
   * @param payload
   * @returns
   */
  upload(payload: any): Observable<any | void> {
    return this.http
      .post<any>(`${environment.API_URL}/doc/upload`, payload)
      .pipe(
        map((res: any) => {
          console.log('enviando archivo y otros datos al servidor', payload);
          return res;
        })
      );
  }
}
