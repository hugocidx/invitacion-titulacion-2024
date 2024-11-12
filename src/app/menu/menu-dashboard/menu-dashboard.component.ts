import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardRoutingModule } from './menu-dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { StickyBarComponent } from '@layout/mobile-ui/sticky-bar/sticky-bar.component';
import { ApiService } from '@services/Api.service';
@Component({
  selector: 'app-menu-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterOutlet,
    StickyBarComponent,
  ],
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.scss'],
})
export class MenuDashboardComponent implements OnInit {
  @Input() data: any = [];
  @Output() handleSucess = new EventEmitter<any>();
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.data = this.apiService.data;
  }
}
