import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CourseService } from '../../services/course/course.service';

@Component({
  selector: 'app-edit-course',
  imports: [MatDialogModule,
    ReactiveFormsModule, MatFormFieldModule, MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule, MatError
  ],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {
  editCourseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCourseComponent>,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: { course: any } // מקבל את הקורס שנבחר לעדכון
  ) {

    this.editCourseForm = this.fb.group({
      title: [this.data.course.title, Validators.required],
      description: [this.data.course.description, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close(); // סוגר את המודל
  }

  async onSubmit(): Promise<void> {
    console.log(this.editCourseForm.value);
    console.log("id:" + this.data.course.id);

    if (this.editCourseForm.valid) {
      const updatedCourse = {
        title: this.editCourseForm.value.title,
        description: this.editCourseForm.value.description,
        teacherId: this.data.course.teacherId
      };
      (await this.courseService.updateCourse(this.data.course.id, updatedCourse)).subscribe({
        next: (response) => {
          console.log('Course updated successfully:', response);
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error updating course:', err);
          alert('Failed to update course');
        }
      });
    }
  }
}
