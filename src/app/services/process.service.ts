import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { TextosService } from './textos/textos.service';
import { LocalBaseService } from './local-base.service';
import { environment } from '@env/environment';
import { formStatus, processRules, requisitos } from '@interfaces/proceso';
@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  @Input() items: any = [];
  protected requisitos: requisitos[] | undefined;
  public attempts: { last_attempt: any };
  public expiration: { expiration_date: any };
  public expirationDate: Date = new Date('2023-09-31');
  public formStatus: formStatus;
  public localService: any;
  public processName: any = 'ayudantia';
  public processConcepts: any;
  public processRules: processRules;
  public requested_at = new Date().toLocaleTimeString();
  public rules_version: { versionRules: string };
  subscription = new Subscription();
  constructor(
    public _http: HttpClient,
    private textosService: TextosService,
    private localBaseService: LocalBaseService
  ) {
    this.formStatus = {
      active: false,
      hasError: [],
      reasons: [],
      hasException: false,
    };
    this.processRules = {
      isBlocked: true,
      //puedeEnviar: ['Alumno'], //deberia controlarlo ACL ??
      hasException: false, // lo mismo o directamente desde EXCEPCION ??
      periodoEnvios: {
        inicio: '2000-01-11T00:00:00Z',
        termino: '2023-12-31T00:00:00Z',
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
      estadosPermiteEliminar: ['0', '100'],
      estadosPermiteDuplicar: ['3'],
    };
    this.rules_version = {
      versionRules: 'v.1.2 demo',
    };
    this.attempts = {
      last_attempt: new Date().toLocaleTimeString(),
    };
  }
  /**
   * metodo que agrega un nuevo intento al pasar por el interceptor
   */
  AddAttempts() {
    const newItem = {
      attempts: { last_attempt: this.attempts.last_attempt },
    };
    this.items.push(newItem);
    console.log(this.items, 'nuevo elemento agregado');
  }
  setFakeConfig() {
    this.localBaseService.addConfig('ayudantias', 'this.processRules', true);
  }
  expirationTime(processName: string): any {
    return this._http
      .get<any>(`${environment.API_URL}/Procesos/expire/${processName}`)
      .pipe(
        map((data) => {
          return data;
        })
      );
    /* 
    const currentDate: Date = new Date();
    const timeDiff: number =
      this.expirationDate.getTime() - currentDate.getTime();
    const daysExpiration: number = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return `${daysExpiration} dias restantes`; */
  }
  getAccess(processName: string): Observable<any> {
    //entiendase como Carga academica
    return this._http
      .get<any>(`${environment.API_URL}/Procesos/acceso/${processName}`)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  /**
   * metodo que obtiene la configuracion del servicio
   * @param processName
   * @returns
   */
  getSrvConfig(processName: string): Observable<any> {
    //entiendase como Carga academica
    return this._http
      .get<any>(`${environment.API_URL}/Procesos/params/${processName}`)
      .pipe(
        map((data) => {
          this.processRules = data;
          this.localService.setConfig(processName, this.processRules);
          return data;
        })
      );
  }
  /**
   * configura el acceso para las variables anidadas de la lista
   * @param processName
   * @returns
   */
  getLocalConfig(processName: string): any {
    const mapa = {
      titleField: 'data.payload.periodo',
      contentField: 'data.payload.monto',
      descriptionField: 'data.payload.monto_total',
      requestField: 'data.attempts.requested_at',
      attemptField: 'data.attempts.last_attempt',
      // funcionales posibles
      acciones: null,
      endpointField: 'data.endpoint',
      responseField: 'last_response',
      statusCode: 200,
      statusField: 'data.payload.status',
    };
    return mapa;
    /*    return 
    titleField: 'data.payload.itemTitle',
    contentField: 'data.payload.itemContent',
    descriptionField: 'data.payload.itemDescription',
    requestField: 'data.payload.requested_at',
    // funcionales posibles
    acciones: null,
    last_attemptField: 'data.attempts.last_attempt',
    last_responseField: 'data.attempts.last_response',
    endpointField: 'data.endpoint',
    responseField: 'last_response',
    statusCode: 200,
    statusField: 'data.payload.status',
   */
    /*     let config$ = new Subject();
    this.localService
      .getItem('config', processName)
      .then((data: unknown) => config$.next(data));
    return config$.asObservable(); */
  }
  /**
   * obtiene textos
   * @param processName
   * @returns
   */
  getTextos(processName: string): Observable<any | void> {
    var processTxt: any;
    this.textosService
      .getTextos(processName)
      .subscribe((data) => (processTxt = data.data));
    return processTxt;
  }
  /**
   * obtiene conceptos
   * @param processName
   * @param grupo
   * @returns
   */
  getConceptos(processName: string, grupo: string): Observable<any | void> {
    var response: any;
    this.textosService
      .getOpciones(processName, grupo)
      .subscribe((data) => (response = data.data));
    return response;
  }
  /**
   * obtiene el estado del formulario
   * @param processRules
   * @returns
   */
  public getFormStatus(processRules: any) {
    this.processRules = processRules;
    this.requisitos = [
      { name: 'outOfTime', value: !this.betweenDates() },
      { name: 'isBloked', value: this.isBloked() },
      { name: 'reachLimit', value: false },
    ];
    // this.formStatus.hasError = this.requisitos
    this.formStatus.active = this.isActive(this.requisitos);
    return this.formStatus;
  }
  protected isActive(requisitos: any[]): boolean {
    const tieneError = requisitos.reduce((a, b) => {
      if (b.value === true) {
        this.formStatus.reasons.push(b);
      }
      return a ^ b.value;
    }, false);
    let exepcion = this.hasExcepcion();
    return exepcion || !tieneError;
  }
  protected hasExcepcion(): boolean {
    return this.processRules.hasException || false;
  }
  protected isBloked() {
    return this.processRules.isBlocked;
  }
  protected betweenDates(): boolean {
    //es importante que las fechas que se comparen se encuentren en las misma zona horaria.
    let ahora = new Date();
    let { inicio } = this.processRules.periodoEnvios;
    let { termino } = this.processRules.periodoEnvios;
    return ahora >= new Date(inicio) && new Date(termino) >= ahora;
  }
  /**
   * metodo que establece fecha plazo en dias
   * @param campofechaControl
   * @returns
   */
  plazoCheck(campofechaControl: string | Date): boolean {
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
    return false;
  }
  /**
   * metodo que establece limitede elementos
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
        (f) => f[limites.filtrarPor] == limites.filtrarValor
      );
      contables = registros.length;
    } else {
      contables = enviadas.length;
    }
    let total = contables + pendientes.length;
    return limites.maximoEnvios > total;
  }
  /**
   * elimina la subcripcion
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
