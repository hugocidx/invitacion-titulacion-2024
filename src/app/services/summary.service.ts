import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  public onSummaryChange: any;
  /**
   * interfaz de variables
   */
  public results = {
    qItemsA: 0,
    qItemsS: 0,
    sumItemsA: 0,
    sumItemsS: 0,
  };
  countItems(data: any[] = []) {
    return data.length;
  }
  /**
   * metodo que suma elementos
   * @param data
   * @param columnaInteres
   * @returns
   */
  sumItems(data: any[] = [], columnaInteres: string = 'id') {
    this.results.sumItemsS = this.sumItemsValue(data, columnaInteres);
    const summaryData = {
      selectedItems: {
        qItemsS: this.countItems(data),
        sumItemsS: this.results.sumItemsS,
      },
      allItems: {
        qItemsA: this.countItems(data),
        sumItemsA: this.results.sumItemsA,
      },
    };
    console.log('summaryData desde el service', summaryData);
    return summaryData;
  }
  /**
   * metodo que suma valores
   * @param data
   * @param columnaInteres
   * @returns
   */
  private sumItemsValue(data: any[] = [], columnaInteres: string) {
    return data.reduce(
      (a: any, b: { [x: string]: any }) => a + Math.floor(b[columnaInteres]),
      0
    );
  }
}
