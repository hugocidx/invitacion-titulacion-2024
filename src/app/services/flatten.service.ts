import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlattenService {
  /**
   * metodo que recibe el elemento = varArray y lo aplana,
   * if === array || === object && != array && object return varArray
   * @param varArray
   * @returns
   */
  flatten(varArray: any): any {
    if (varArray.length === 0) {
      return null;
    }
    if (typeof varArray === 'object') {
      varArray = this.flattenObject(varArray);
    }
    if (Array.isArray(varArray)) {
      varArray = this.flattenArray(varArray);
    } else {
      varArray = this.convertArray(varArray);
    }
    return varArray;
  }
  /**
   * metodo para aplanar arreglos
   * @param arr
   * @returns array
   */
  flattenArray(arr: any): any {
    let array = [];
    array = arr.flat(9);
    return array;
  }
  /**
   *  metodo para aplanar arreglo de objetos
   * @param objArr
   * @returns array
   */
  flattenObject(objArr: any) {
    let array = [];
    for (let obj of objArr) {
      let object = {};
      for (let [key, value] of Object.entries(obj)) {
        if (Object.prototype.toString.call(value) == '[object Object]') {
          for (let [k, v] of Object.entries(value)) {
            if (typeof v === 'object' && v !== null) {
              for (let [nestedKey, nestedValue] of Object.entries(v)) {
                object[key + '.' + k + '.' + nestedKey] = nestedValue;
              }
            } else {
              object[key + '.' + k] = v;
            }
          }
        } else {
          object[key] = value;
        }
      }
      array.push(object);
    }
    return array;
  }
  /**
   * convierte un elemento en array
   * @param element
   */
  convertArray<T>(element: T): T[] {
    console.log([element], 'elemento convertido a array');
    return [element];
  }
  /**  
   * metodo para aplanar array de objectos =! de lista de objetos 
   * combinar con if de validacion de entrada de lista para extender el alcanze del metodo aplanador flatten() 
   * @param obj 
   * @param parentKey 
   * @param result 
   * @returns 
  flattenObject(obj: { [ x: string ]: any; data?: { attempts: { last_attempt: string; last_response: string; }; dataSetName: string; endpoint: string; expiration_date: string; payload: { dataSetName: string; itemContent: string; itemDescription: string; itemTitle: string; }; identidad: string; requested_at: string; rules_version: string; }; }, parentKey = '', result = {}) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const currentKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            this.flattenObject(obj[key], currentKey, result);
          } else {
            result[currentKey] = obj[key];
          }
        }
      }
      return result;
    }
    */
}
