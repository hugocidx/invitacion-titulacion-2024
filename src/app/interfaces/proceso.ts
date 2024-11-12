/**
 *  Interfaz de Reglas de proceso almacena las reglas de cada uno de los procesos, se carga al inicializar y luego es almacenado de forma local.
 * Permite conocer los limites o como controlar cada formulario del proceso.
 */
export interface processRules {
  isBlocked?: boolean;
  puedeEnviar?: string[];
  hasException?: boolean;
  periodoEnvios: {
    inicio: string;
    termino: string;
  };
  limites: {
    maximoEnvios?: number;
    filtrarPor?: string;
    filtrarValor?: number;
  };
  plazos?: {
    unidadControl: string;
    desde: number;
    hasta: number;
  };
  estadosPermiteEliminar: string[];
  estadosPermiteDuplicar: string[];
}
export interface formStatus {
  active: boolean;
  reasons?: any;
  hasError?: any;
  hasException?: boolean;
}
export interface requisitos {
  name: string;
  value?: any;
}
