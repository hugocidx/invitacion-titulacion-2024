import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Localbase from 'localbase';
import { ToastComponent } from '@notifications/toast/toast.component';
@Injectable({
  providedIn: 'root',
})
export class LocalBaseService {
  private db = new Localbase();
  private itemAddedSubject = new Subject<void>();
  private items$: any = [];
  public sends = [];
  public trys: any;
  public itemAdded$ = this.itemAddedSubject.asObservable();
  // public dataseName: string = '';
  constructor(private toast: ToastComponent) {
    this.items$ = new Subject();
    this.db = new Localbase('FASN');
  }
  /**
   * metodo que re-envia un elemento, si es nuevo o si ya esta en localbase
   * @param dataSetName
   * @param apiUrl
   * @param payload
   * @param key
   */
  isNewItem(dataSetName: string, apiUrl: string, payload: any, key: any) {
    if (!key) {
      this.addItem(dataSetName, apiUrl, payload, key);
    } else {
      this.setItem(dataSetName, apiUrl, payload, key);
    }
  }
  /**
   * metodo que agrega un elemento en caso de ser nuevo
   * @param collectionName
   * @param endpoint
   * @param payload
   * @param key
   * @returns
   */
  addItem(
    collectionName: string,
    endpoint: string,
    payload: any,
    key: any
  ): Observable<any> {
    const data = {
      datasetName: collectionName,
      endpoint: endpoint,
      payload: payload,
      key: key,
    };
    const result$ = new Subject();
    this.db
      .collection(collectionName)
      .get() // Obtén todos los elementos actuales
      .then((currentItems: any) => {
        // Inserta el nuevo elemento al principio de la lista
        // data = signal(data)
        currentItems.unshift(data);
        this.db
          .collection(collectionName)
          .set(currentItems)
          .then(() => {
            result$.next({ isNew: false, item: data });
            this.itemAddedSubject.next();
          })
          .catch((err: any) => {
            // Manejo de errores
            console.error('Error al agregar el elemento:', err);
          });
      })
      .catch((err: any) => {
        // Manejo de errores
        console.error('Error al obtener elementos actuales:', err);
      });
    return result$;
  }
  /**
   * metodo que actualiza un elemento guardado en localbase
   * @param collectionName
   * @param endpoint
   * @param payload
   * @param key
   * @returns
   */
  setItem(
    collectionName: string,
    endpoint: string,
    payload: any,
    key: any
  ): Observable<any> {
    const data = {
      dataSetName: collectionName,
      endpoint: endpoint,
      payload: payload,
      key: key,
    };
    const result$ = new Subject();
    this.db
      .collection(collectionName)
      .doc(key)
      .update(data)
      .then(() => {
        result$.next({ isNew: false, item: data });
        this.itemAddedSubject.next(); // Emitir evento cuando se actualiza un elemento
      })
      .catch((err: any) => {
        this.db
          .collection(collectionName)
          .add(data)
          .then((item: { data: any }) => {
            result$.next({ isNew: true, item: item.data });
            this.itemAddedSubject.next(); // Emitir evento cuando se agrega un elemento
          });
      });
    return result$;
  }
  /**
   * metodo que elimina un elemento de localbase
   * @param collectionName
   * @param key
   */
  deleteItem(collectionName: string, key: string) {
    this.db
      .collection(collectionName)
      .doc(key)
      .delete()
      .then((response: any) => {
        console.log('Eliminado correctamente', response);
        this.toast.open('Eliminado de localBase');
      })
      .catch((error: any) => {
        console.log('Hubo un error, no se eliminó', error);
        this.toast.open('Hubo un error, no se eliminó');
      });
  }
  updateItem(collectionName: string, key: string, newData: any) {
    this.db.collection(collectionName).doc(key).update(newData).then();
  }
  /**
   * metodo que trae todos los elementos de la localbase
   * @param collectionName
   * @returns
   */
  getAll(collectionName: string): Observable<any> {
    this.db
      .collection(collectionName)
      .get({ keys: true })
      .then((res: any) => {
        this.items$.next(res);
      })
      .catch((err: any) => console.log(err));
    return this.items$.asObservable();
  }
  /**
   * metodfo que trae un objeto en especifico de localbase
   * @param collectionName
   * @param key
   * @returns
   */
  getItem(collectionName: string, key: string): any {
    return this.db
      .collection(collectionName)
      .doc(key)
      .get()
      .then((res: any) => {
        return res;
      })
      .catch((error: any) => {
        return false;
      });
  }
  /**
   * metodo para traer config de localbase
   * @param collectionName
   * @param processName
   * @returns
   */
  getConfig(collectionName: string, processName: string) {
    return this.db
      .collection(collectionName)
      .doc(processName)
      .get()
      .then((res: { data: any }) => {
        return res.data;
      });
  }
  /**
   * metodo que manda una configuracion a localbsae
   * @param datasetName
   * @param key
   * @param data
   * @returns
   */
  addConfig(datasetName: string, key: string, data: any): Observable<any> {
    const result$ = new Subject();
    this.db
      .collection(datasetName)
      .doc(key)
      .set(data)
      .then((newItem: { data: any }) => {
        result$.next({ isNew: false, item: newItem.data });
      })
      .catch((err: any) => {
        this.db
          .collection(datasetName)
          .add(data)
          .then((item: { data: any }) => {
            result$.next({ isNew: true, item: item.data });
          });
      });
    return result$;
  }
  /**
   * metodo que trae una configuracion de localbase
   * @param collectionName
   * @param processName
   * @param configData
   * @returns
   */
  setConfig(collectionName: string, processName: string, configData: any): any {
    const data = {
      dataSetName: collectionName,
      processName: processName,
      validacion: configData,
    };
    return this.db
      .collection(collectionName)
      .doc(processName)
      .set(data)
      .then((res: any) => {
        return res;
      });
  }
}
