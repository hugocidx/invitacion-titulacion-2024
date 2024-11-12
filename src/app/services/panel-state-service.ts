import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class PanelStateService {
  getViewState(localStorageKey, col: number = 1, row: number): boolean {
    let paneles: any = JSON.parse(localStorage.getItem(localStorageKey));
    //la estructura dependerá exclusivamente de la configuración inicial.
    return paneles?.columns[col]?.rows[row]?.visible;
  }
}
