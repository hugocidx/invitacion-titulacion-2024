import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Localbase from 'localbase';
import { ToastComponent } from '@notifications/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class UserBaseService {
  private db = new Localbase();
  private keyCounter: number = 0;
  private items$ = new Subject<any[]>();
  constructor(private toast: ToastComponent) {
    this.db = new Localbase('FASN');
  }
  /**
   * Agregar elementos a local-base
   */
  addItem(collectionName: string, items: any): Observable<any> {
    // Incrementar el contador de la clave
    this.keyCounter++;
    const data = {
      items: items,
      metadata: { created_at: new Date() },
    };
    const result$ = new Subject();
    this.db
      .collection(collectionName)
      .add(data, `usuario ${this.keyCounter}`)
      .then((newItem: { data: any }) => {
        result$.next({ isNew: false, item: newItem.data });
        // Emitir cambios en la colección
        this.refreshItems(collectionName);
      })
      .catch((err: any) => {
        this.db
          .collection(collectionName)
          .add(data)
          .then((item: { data: any }) => {
            result$.next({ isNew: true, item: item.data });
            // Emitir cambios en la colección
            this.refreshItems(collectionName);
          });
      });
    return result$;
  }
  /**
   * Eliminar elementos de la local-base
   */
  deleteItem(collectionName: string, key: string) {
    this.db
      .collection(collectionName)
      .doc(key)
      .delete()
      .then((response: any) => {
        console.log('Eliminado correctamente', response);
        this.toast.open('Eliminado de localBase');
        // Emitir cambios en la colección
        this.refreshItems(collectionName);
      })
      .catch((error: any) => {
        console.log('Hubo un error, no se eliminó', error);
        this.toast.open('Hubo un error, no se eliminó');
      });
  }
  /**
   * Consultar elementos de local-base
   */
  getAll(collectionName: string): Observable<any> {
    this.refreshItems(collectionName);
    return this.items$.asObservable();
  }
  /**
   * Método para emitir cambios en la colección
   */
  private refreshItems(collectionName: string) {
    this.db
      .collection(collectionName)
      .get({ keys: true })
      .then((res: any) => {
        this.items$.next(res);
      })
      .catch((err: any) => console.log(err));
  }
}
