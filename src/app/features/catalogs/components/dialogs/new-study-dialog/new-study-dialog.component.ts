import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { StudyService } from '../../../service/study.service';
@Component({
  standalone: true,
  selector: 'app-new-study-dialog',
  templateUrl: './new-study-dialog.component.html',
  styleUrls: ['./new-study-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class NewStudyDialogComponent {
  studyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewStudyDialogComponent>,
    private studyService: StudyService
  ) {
    this.studyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.studyForm.valid) {
      this.studyService.addStudy({
        title: this.studyForm.value.name,
        description: this.studyForm.value.description
      });
      this.dialogRef.close();
    } else {
      this.studyForm.markAllAsTouched();
    }
  }
}
