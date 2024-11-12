import { Component, Injectable, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlattenService } from '@services/flatten.service';
import { CeresToastNotificationComponent } from '@notifications/ceres-toast-notification/ceres-toast-notification.component';
import { ProcessService } from '@services/process.service';
import { CeresSimpleListsComponent } from '../ceres-simple-lists/ceres-simple-lists.component';
import { CeresAccordionListsComponent } from '../ceres-accordion-lists/ceres-accordion-lists.component';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'ceres-api-lists',
  standalone: true,
  templateUrl: './api-local-wrap.html',
  imports: [
    CommonModule,
    CeresSimpleListsComponent,
    CeresAccordionListsComponent,
  ],
})
export class ApiListsComponent implements OnInit {
  @Input() listSelected: string = '';
  @Input() processName: string = '';
  public config: any = [];
  public fakeList: any = [];
  public items: any = [];
  public itemsF: any = [];
  public itemsP: any = [];
  public name: string | undefined;
  public pendientes: string | undefined;
  getUsers(): any[] {
    throw new Error('Method not implemented.');
  }
  constructor(
    private flattenService: FlattenService,
    // private dataService: ApiService,
    private toast: CeresToastNotificationComponent,
    private processService: ProcessService
  ) {}
  ngOnInit(): void {
    this.config = this.processService.getLocalConfig(this.processName);
    this.getAll();
  }
  /**
   * metodo que simula recepcion de elementos desde el api
   */
  getAll() {
    const list = [
      {
        data: {
          attempts: {
            last_attempt: this.processService.attempts.last_attempt,
            requested_at: new Date().toLocaleString(),
            // 'Tue Jul 25 2023 16:53:42 GMT-0400 (hora estándar de Chile)',
          },
          dataSetName: 'DOI',
          endpoint: 'api/v1/DOI/',
          expiration_date: '68 dias restantes',
          payload: {
            dataSetName: 'DOI',
            monto: 'periodo academico',
            monto_total: '11.900.000',
            periodo: 'primer semestre',
          },
          identidad: '1598635420230228',
          rules_version: 'v.1.2 demo',
        },
      },
      {
        data: {
          attempts: {
            last_attempt: this.processService.attempts.last_attempt,
            requested_at: new Date().toLocaleString(),
          },
          dataSetName: 'DOI',
          endpoint: 'api/v1/DOI/',
          expiration_date: '68 dias restantes',
          payload: {
            dataSetName: 'DOI',
            monto: 'periodo academico',
            monto_total: '11.900.000',
            periodo: 'primer semestre',
          },
          identidad: '1598635420230228',
          rules_version: 'v.1.2 demo',
        },
      },
      {
        data: {
          attempts: {
            last_attempt: this.processService.attempts.last_attempt,
            requested_at: new Date().toLocaleString(),
            // 'Tue Jul 25 2023 16:53:42 GMT-0400 (hora estándar de Chile)',
          },
          dataSetName: 'DOI',
          endpoint: 'api/v1/DOI/',
          expiration_date: '68 dias restantes',
          payload: {
            dataSetName: 'DOI',
            monto: 'periodo academico',
            monto_total: '11.900.000',
            periodo: 'primer semestre',
          },
          identidad: '1598635420230228',
          rules_version: 'v.1.2 demo',
        },
      },
    ];
    // const flattenedData = this.flattenObject(list);
    // // this.items = flattenedData
    // console.log('this.items', this.items)
    // envio y recibo elementos desde flattenService
    this.itemsP = this.flattenService.flatten(list);
    // muestra elementos despues de flat
    console.log('lista proveniente del remote', this.itemsP);
  }
  /**
   * crea un nuevo elemento de forma falsa
   */
  NewItem() {
    const newItem = {
      itemTitle: 'nuevo Rol',
      itemDescription: 'descripcion de un nuevo elemento',
      itemContent: 'contenido de un nuevo elemento',
      acciones: null,
      status: 'Pendiente',
    };
    this.items.push(newItem);
    console.log(this.items, 'nuevo elemento creados en lista');
  }
  handleDeleteItem($event: any): void {
    this.itemsP.splice($event, 1);
    console.log('items', this.itemsP);
    this.toast.open('Eliminado de remote');
  }
}
