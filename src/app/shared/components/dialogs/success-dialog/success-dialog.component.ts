import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss'],
  imports: [MatIconModule,CommonModule],
  standalone: true,
})
export class SuccessDialogComponent implements OnInit, OnDestroy {
  private autoCloseTimeout: any;
  
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      title: string; 
      message: string;
      image?: string;
      duration?: number;
    },
    private el: ElementRef
  ) {}
  
  ngOnInit(): void {
    const duration = this.data.duration || 5000;
    this.autoCloseTimeout = setTimeout(() => {
      this.close();
    }, duration);
    
    this.dialogRef.addPanelClass('transparent-backdrop');
    
    this.dialogRef.updatePosition({ bottom: '20px' });
  }
  
  ngOnDestroy(): void {
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
    }
  }
  
  close(): void {
    const toastElement = this.el.nativeElement.querySelector('.success-toast');
    if (toastElement) {
      toastElement.classList.add('closing');
      setTimeout(() => {
        this.dialogRef.close();
      }, 300); 
    } else {
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
  
}