import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { FlattenService } from '@services/flatten.service';
import { LocalBaseService } from '@services/local-base.service';
import { ProcessService } from '@services/process.service';
import { ReglasService } from '@services/reglas.service';
import { CeresAccordionListsComponent } from 'ceres-accordion-lists';
import { CeresSimpleListsComponent } from 'ceres-simple-lists';
import { CeresToastNotificationComponent } from 'ceres-toast-notification';
@Injectable({
  providedIn: 'root',
})
@Component({
  standalone: true,
  selector: 'ceres-local-lists',
  templateUrl: './api-local-wrap.html',
  imports: [
    CommonModule,
    CeresSimpleListsComponent,
    CeresAccordionListsComponent,
  ],
})
export class LocalListsComponent implements OnInit {
  @Input() config: any = [];
  @Input() data: any = [];
  @Input() listSelected: string = '';
  @Input() onDelete: any;
  @Input() processName: string = '';
  @Output() changeSelection = new EventEmitter<any>();
  private subscription: Subscription = new Subscription();
  public attempts: any;
  public datasetName: string = 'DOI';
  public endpoint: any;
  public expire_at: any;
  public formSent_date = new Date().toLocaleTimeString();
  public identidad: any;
  public items: any = [];
  public itemsF: any = [];
  public itemsP: any = [];
  public newData = '';
  public payload: any;
  public pendientes = new Subject<any[]>();
  public sends: any = [];
  constructor(
    private flattenService: FlattenService,
    private localBaseService: LocalBaseService,
    private processService: ProcessService,
    private reglas: ReglasService,
    private toast: CeresToastNotificationComponent
  ) {
    this.pendientes = new Subject();
  }
  handleSucess(e: any) {
    console.log('selectedItems');
  }
  ngOnInit(): void {
    this.config = this.processService.getLocalConfig(this.processName);
    // Suscribirse al Subject en LocalBaseService
    this.subscription.add(
      this.localBaseService.itemAdded$.subscribe(() => {
        // Llamada al método para actualizar la vista
        this.getAll();
      })
    );
    // Obtener la lista inicial
    this.getAll();
  }
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  handleSelection(e: any) {
    this.changeSelection.emit(e);
    console.log(e, 'evento click, enviar pendientes');
  }
  /**
   * trae elementos desde el localbase
   */
  getAll() {
    this.subscription.add(
      this.localBaseService.getAll(this.datasetName).subscribe((res: any) => {
        this.items = res;
        // console.log('elementos que trae el local list', this.items);
        this.prepareData();
      })
    );
  }
  /**
   *  metodo que parsea elementos del payload y los prepara para mostrarlos en el html
   *
   * funcion comentada que entre solo elementos especificos para el formulario
   */
  prepareData() {
    // envia elementos hacia flatService y recibe objetos aplanados como array
    const flatItems = this.flattenService.flatten(this.items);
    this.itemsP = flatItems;
    console.log('elementos parseados', this.itemsP);
  }
  handleDeleteItem(item: any) {
    console.log('item', item);
    const key: string = item.key;
    this.localBaseService.deleteItem(this.datasetName, key);
    const index = this.itemsP.findIndex(
      (arrayItem: any) => arrayItem.key === item.key
    );
    if (index !== -1) {
      this.itemsP.splice(index, 1);
    }
    // Emitir el evento al Subject pendientes
    this.pendientes.next(this.itemsP);
  }
  /**
   * limita la cantidad de elementos creados
   * @returns limite de elementos
   */
  checkLimit() {
    this.reglas.checkLimit(this.sends, this.pendientes);
    this.toast.open('ha alcanzado el limite de elementos pendientes');
  }
  /**
   * elimina la subscripcion
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
