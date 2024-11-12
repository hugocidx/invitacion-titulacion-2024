import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuDialComponent } from '@menu/menu-dial/menu-dial.component';
@Component({
  selector: 'app-sticky-bar',
  standalone: true,
  imports: [MenuDialComponent, MatToolbarModule],
  templateUrl: './sticky-bar.component.html',
  styleUrls: ['./sticky-bar.component.scss'],
})
export class StickyBarComponent {
  @Output() handleSelection = new EventEmitter<any>();
  handleSuccess(e: any) {
    this.handleSelection.emit(e);
    console.log(e, 'emite desde el sticky bar');
  }
}
