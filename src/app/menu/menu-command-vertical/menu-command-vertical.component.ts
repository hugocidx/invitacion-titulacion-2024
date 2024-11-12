import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActionCommandMenu } from '@interfaces/catalogo';

@Component({
  selector: 'app-menu-command-vertical',
  templateUrl: './menu-command-vertical.component.html',
  styleUrls: ['./menu-command-vertical.component.scss'],
})
export class MenuCommandVerticalComponent implements OnChanges {
  @Output() togglePanel = new EventEmitter<boolean>();
  @Output() actionSelected = new EventEmitter<any>();
  @Input() hasSelection: boolean = false;
  @Input() items: ActionCommandMenu[] = [];
  @Input() datasetTitle: string = 'DATASET TITLE';
  @Input() dataSets: any = [];
  @Input() disabled: boolean = true;
  constructor() {}
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']?.isFirstChange()) {
    }
  }
  handleAction(e: string) {
    this.actionSelected.emit(e);
  }
}
