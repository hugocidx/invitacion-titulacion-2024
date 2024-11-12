import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss',
  imports: [CommonModule, MatDialogModule],
})
export class SuccessDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
