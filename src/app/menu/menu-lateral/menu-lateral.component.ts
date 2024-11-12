import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { LoaderService } from '@services/loader.service';
import { CeresConfirmCodeComponent } from 'ceres-confirm-code-notification';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
    CeresConfirmCodeComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    TranslocoModule,
  ],
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent implements OnChanges {
  @Input() claseFoco: string = '';
  @Input() viewDeletedItems: boolean;
  @Input() open: boolean = false;
  @Input() resumeData: any;
  @Input() selectedItems: any;
  @Output() selectedOption = new EventEmitter<any>();
  private subscription: Subscription = new Subscription();
  constructor(private loaderService: LoaderService) {}
  public loading: boolean;
  public codeclaseFoco = '';
  ngOnChanges(): void {
    this.codeclaseFoco = 'lang.menu.' + this.claseFoco;
    this.loaderService.isLoading.subscribe((r: boolean) => (this.loading = r));
  }
  selectOption(e: string) {
    console.log(e);
    this.selectedOption.emit(e);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
