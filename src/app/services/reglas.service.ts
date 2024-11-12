import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ReglasService {
  public subscription = new Subscription();
  /**
   * lista de reglas de procesos
   */
  public processRules = {
    isBlocked: true,
    //puedeEnviar: ['Alumno'], //deberia controlarlo ACL ??
    hasException: false, // lo mismo o directamente desde EXCEPCION ??
    periodoEnvios: {
      inicio: '2000-01-11T00:00:00Z',
      termino: '2022-12-31T00:00:00Z',
    },
    limites: {
      filtrarPor: '',
      filtrarValor: 0,
      maximoEnvios: 0,
    },
    plazos: {
      unidadControl: 'diasCompletos',
      desde: -120,
      hasta: 120,
    },
  };
  /**
   * metodo que checkea la disponibilidad en tiempo de los elementos pendientes
   * @param campofechaControl
   */
  plazoCheck(campofechaControl: string | Date) {
    let hoy: Date;
    let fechaControl: Date;
    let { desde, hasta, unidadControl } = this.processRules.plazos;
    if (unidadControl === 'diasCompletos') {
      hoy = new Date(new Date().toString().slice(0, 10));
      fechaControl = new Date(campofechaControl.toString().slice(0, 10));
    } else {
      hoy = new Date();
      fechaControl = new Date(campofechaControl);
    }
  }
  /**
   * metodo que limita la cantidad de elementos pendientes
   * @param enviadas
   * @param pendientes
   * @returns
   */
  checkLimit(enviadas: any, pendientes: any) {
    let limites = this.processRules.limites;
    let contables: number = 0;
    let registros: any = [];
    if (limites.filtrarPor !== undefined) {
      registros = enviadas?.filter(
        (f: { [x: string]: number }) =>
          f[limites.filtrarPor] == limites.filtrarValor
      );
      contables = registros.length;
    } else {
      contables = enviadas.length;
    }
    let total = contables + pendientes.length;
    return limites.maximoEnvios > total;
  }
  /**
   * elimina la subscripcion
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
