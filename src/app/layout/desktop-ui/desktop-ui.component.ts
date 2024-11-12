import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AngularSplitModule } from 'angular-split';
import { cloneDeep } from 'lodash';
import { PanelInferiorComponent } from './panel-inferior/panel-inferior.component';
import { interConfig } from '@interfaces/ui';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { MenuLateralComponent } from '@app/menu/menu-lateral/menu-lateral.component';
@Component({
  standalone: true,
  imports: [
    AngularSplitModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    PanelInferiorComponent,
    ScrollingModule,
    TranslocoModule,
    HeaderComponent,
    MenuLateralComponent,
  ],
  selector: 'app-desktop-layout',
  templateUrl: './desktop-ui.component.html',
  styleUrls: ['./desktop-ui.component.scss'],
  // animations: ['transform'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopUIComponent implements OnInit {
  @Input() claseFoco: string;
  @Input() defaultConfig: interConfig | undefined;
  @Input() drawerStatus: boolean;
  @Input() loading: boolean = true;
  @Input() ui_schena_name = 'default_name';
  @Input() viewDeletedItems: boolean;
  @Output() drawerChanges = new EventEmitter<any>();
  @Output() handleAction = new EventEmitter<any>();
  @Output() onPanelVisibilityChange = new EventEmitter<any>();
  public config: interConfig | undefined;
  ngOnInit() {
    if (localStorage.getItem(this.ui_schena_name)) {
      this.config = JSON.parse(localStorage.getItem(this.ui_schena_name) || '');
    } else {
      this.resetConfig();
    }
  }
  /**
   * Emite al exterior si la columna o panel esta visible.
   */
  emitColumnVisibility(e: any) {
    this.onPanelVisibilityChange.emit(e);
  }
  resetConfig() {
    this.config = cloneDeep(this.defaultConfig);
    localStorage.removeItem(this.ui_schena_name);
    this.saveLocalStorage();
  }
  onDragEnd(
    columnindex: number,
    e: { gutterNum: number; sizes: Array<number> } | any
  ) {
    console.log();
    /**
     * Column dragged
     */
    if (columnindex === -1) {
      // Set size for all visible columns
      this.config.columns
        .filter((c) => c.visible === true)
        .forEach((column, index) => (column.size = e.sizes[index]));
    }
    // Row dragged
    else {
      // Set size for all visible rows from specified column
      this.config.columns[columnindex].rows
        .filter((r) => r.visible === true)
        .forEach((row, index) => (row.size = e.sizes[index]));
    }
    this.saveLocalStorage();
  }
  handleActionEvent(e: string) {
    this.handleAction.emit[e]();
    // this[e]();
  }
  toggleDrawer(e: any) {
    console.log('estado drawer', e);
    this.drawerChanges.emit(e);
  }
  toggleDisabled() {
    if (!this.config) {
      return;
    }
    this.config.disabled = !this.config.disabled;
    this.saveLocalStorage();
  }
  refreshColumnVisibility() {
    if (!this.config) {
      return;
    }
    /**
     * refresca la vista segun preferencia de uusario
     */
    this.config.columns.forEach((column: any, _index: number) => {
      column.visible = column.rows.some((row: any) => row.visible === true);
    });
    this.saveLocalStorage();
  }
  saveLocalStorage() {
    localStorage.setItem(this.ui_schena_name, JSON.stringify(this.config));
  }
}
