import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { StudyService} from '../../../service/study.service';
import { Study } from '../../../models/study.model';

@Component({
  standalone: true,
  selector: 'app-edit-study-dialog',
  templateUrl: './edit-study-dialog.component.html',
  styleUrls: ['./edit-study-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class EditStudyDialogComponent {
  studyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditStudyDialogComponent>,
    private studyService: StudyService,
    @Inject(MAT_DIALOG_DATA) public data: Study
  ) {
    this.studyForm = this.fb.group({
      name: [data.title, Validators.required],
      description: [data.description, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.studyForm.valid) {
      this.studyService.updateStudy({
        id: this.data.id,
        title: this.studyForm.value.name,
        description: this.studyForm.value.description
      });
      this.dialogRef.close();
    } else {
      this.studyForm.markAllAsTouched();
    }
  }
}
