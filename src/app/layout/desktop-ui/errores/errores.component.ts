import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
@Component({
  standalone: true,
  imports: [MatCardModule],
  selector: 'app-layout-errores',
  templateUrl: './errores.component.html',
  styleUrls: ['./errores.component.scss'],
})
export class ErroresComponent {}
