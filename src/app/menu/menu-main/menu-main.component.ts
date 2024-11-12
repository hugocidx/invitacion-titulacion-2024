import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuService } from '@services/menu.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-menu-principal',
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu-main.component.scss'],
})
export class MenuMainComponent implements OnInit {
  constructor(private dataService: MenuService) {}
  private subscription: Subscription = new Subscription();
  public items: any = [];
  ngOnInit(): void {
    this.subscription.add(
      this.dataService.getItems().subscribe((res: any) => {
        this.items = res.data;
      })
    );
  }
}
