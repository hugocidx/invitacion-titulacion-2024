import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@ngneat/transloco';
import { CeresConfirmCodeComponent } from 'ceres-confirm-code-notification';
@Component({
  standalone: true,
  selector: 'app-menu-text-commands',
  templateUrl: './menu-text-commands.component.html',
  styleUrls: ['./menu-text-commands.component.scss'],
  imports: [
    CeresConfirmCodeComponent,
    CommonModule,
    TranslocoModule,
    MatButtonModule,
  ],
})
export class MenuTextCommandsComponent implements OnInit {
  @Output() togglePanel = new EventEmitter<boolean>();
  @Output() actionSelected = new EventEmitter<any>();
  @Input() hasSelection: boolean = false;
  @Input() items: any = [];
  @Input() datasetTitle: string = '';
  @Input() dataSets: any = [];
  @Input() disabled: boolean = true;
  constructor() {}
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']?.isFirstChange()) {
    }
  }
  button: boolean[] = [];
  handleAction(e: string) {
    //el item ha sido presionado.
    this.actionSelected.emit(e);
  }
}
