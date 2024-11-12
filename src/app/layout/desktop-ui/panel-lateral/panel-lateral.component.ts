import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  standalone: true,
  imports: [MatIconModule],
  selector: 'app-panel-lateral',
  templateUrl: './panel-lateral.component.html',
  styleUrls: ['./panel-lateral.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelLateralComponent implements OnChanges {
  @Input() titulo: string = '';
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['titulo'].firstChange) {
    }
  }
}
