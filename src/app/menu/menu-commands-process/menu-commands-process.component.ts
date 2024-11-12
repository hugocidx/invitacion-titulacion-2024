import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-menu-commands-process',
  templateUrl: './menu-commands-process.component.html',
  styleUrls: ['./menu-commands-process.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuCommandsProcessComponent implements OnInit {
  @Output() togglePanel = new EventEmitter<boolean>();
  @Output() actionSelected = new EventEmitter<any>();
  @Input() status: any = [
    { id: 1, glosa: 'Activo' },
    { id: 0, glosa: 'Inactivo' },
  ];
  constructor() {}
  ngOnInit(): void {}
  handleAction(action: string) {
    this.actionSelected.emit(action);
  }
}
