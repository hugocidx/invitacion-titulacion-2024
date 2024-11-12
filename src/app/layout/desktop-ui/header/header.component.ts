import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
  SimpleChange,
  Input,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription } from 'rxjs';
@Component({
  standalone: true,
  imports: [MatToolbarModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input('app_version')
  'app_version': string;
  @Output() toggleSidenav = new EventEmitter<void>();
  private subscription: Subscription = new Subscription();
  ngOnInit(): void {}
  getName() {}
  ngonChanges(cambios: SimpleChange) {
    console.log('cambios', cambios);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onToggleSideNav(): void {
    console.log('onToggleSideNav');
    this.toggleSidenav.emit();
  }
  onLogOut(): void {}
}
