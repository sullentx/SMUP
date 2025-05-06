import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
  imports: [MatIconModule,CommonModule],
  standalone: true,
})

export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string, image?: string, icon?: string, iconType?: string, iconColor?: string, iconSize?: string, buttonText?: string, buttonColor?: string, buttonIcon?: string, buttonIconSize?: string, buttonIconColor?: string  }
  ) {}


  
  onClose(): void {
    this.dialogRef.close();
  }
}