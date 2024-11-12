import {
  SpeedDialFabComponent,
  SpeedDialFabPosition,
} from './speed-dial-fab/speed-dial-fab.component';
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenudialConfig } from './menu-dial.config';
@Component({
  selector: 'app-menu-dial',
  standalone: true,
  templateUrl: './menu-dial.component.html',
  styleUrls: ['./menu-dial.component.scss'],
  imports: [FormsModule, CommonModule, SpeedDialFabComponent],
})
export class MenuDialComponent {
  @Output() changeSelection = new EventEmitter<any>();
  public SpeedDialFabPosition = SpeedDialFabPosition;
  public speedDialFabColumnDirection = 'column';
  public speedDialFabPosition = SpeedDialFabPosition.Top;
  public speedDialFabPositionClassName = 'speed-dial-container-top';
  constructor(public config: MenudialConfig) {}
  onPositionChange(position: SpeedDialFabPosition) {
    switch (position) {
      case SpeedDialFabPosition.Bottom:
        this.speedDialFabPositionClassName = 'speed-dial-container-bottom';
        this.speedDialFabColumnDirection = 'column-reverse';
        break;
      default:
        this.speedDialFabPositionClassName = 'speed-dial-container-top';
        this.speedDialFabColumnDirection = 'column';
    }
  }
  handleSuccess(e: any) {
    this.changeSelection.emit(e);
    console.log(e, 'emite desde el menu dial');
  }
}
