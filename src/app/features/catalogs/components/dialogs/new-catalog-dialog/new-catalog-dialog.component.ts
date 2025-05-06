import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CatalogService } from '../../../service/catalog.service';
@Component({
  standalone: true,
  selector: 'app-new-catalog-dialog',
  templateUrl: './new-catalog-dialog.component.html',
  styleUrls: ['./new-catalog-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class NewCatalogDialogComponent {
  catalogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewCatalogDialogComponent>,
    private catalogService: CatalogService
  ) {
    this.catalogForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.catalogForm.valid) {
      this.catalogService.addItem({
        title: this.catalogForm.value.name,
        description: this.catalogForm.value.description
      });
      this.dialogRef.close();
    } else {
      this.catalogForm.markAllAsTouched();
    }
  }
}
