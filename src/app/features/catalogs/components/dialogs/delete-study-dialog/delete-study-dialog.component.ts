import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { StudyService} from '../../../service/study.service';
import { Study } from '../../../models/study.model';

@Component({
  selector: 'app-delete-study-dialog',
  standalone: true,
  templateUrl: './delete-study-dialog.component.html',
  styleUrls: ['./delete-study-dialog.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class DeleteStudyDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteStudyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { study: Study; title: string; message: string; image?: string },
    private studyService: StudyService
  ) {}

  onConfirm(): void {
    this.studyService.deleteStudy(this.data.study.id);
    this.dialogRef.close(true); 
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
