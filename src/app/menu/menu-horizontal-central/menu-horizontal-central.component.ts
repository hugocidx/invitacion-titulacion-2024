import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, MatMenuModule, MatIconModule],
  selector: 'app-menu-horizontal-central',
  templateUrl: './menu-horizontal-central.component.html',
  styleUrls: ['./menu-horizontal-central.component.scss'],
})
export class MenuHorizontalCentralComponent implements OnInit {
  @Input() items: any = [];
  @Input() titulo: string = '';
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {}
  handleInnerClick(e: any) {
    this.router.navigate([e], { relativeTo: this.route });
  }
}
