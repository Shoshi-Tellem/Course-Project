import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LessonService } from '../../services/lesson/lessons.service';
import { EditCourseComponent } from '../edit-course/edit-course.component';

@Component({
  selector: 'app-lessons',
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule,],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent {
  editLessonForm!: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCourseComponent>,
    private lessonService: LessonService,
    @Inject(MAT_DIALOG_DATA) public data: { lesson: any, }
  ) { }

  ngOnInit(): void {
    this.editLessonForm = this.fb.group({
      title: [this.data.lesson.title, Validators.required],
      content: [this.data.lesson.content, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  async onSubmit(): Promise<void> {
    console.log(this.editLessonForm.value);
    console.log("id:" + this.data.lesson.id);
    console.log("COURSEid:" + this.data.lesson.id);

    if (this.editLessonForm.valid) {
      const updatedLesson = {
        title: this.editLessonForm.value.title,
        content: this.editLessonForm.value.content,
        courseId: this.data.lesson.courseId,
        id: this.data.lesson.id
      };
      console.log('lesson', updatedLesson);

      (await this.lessonService.updateLesson(this.data.lesson.id, this.data.lesson.courseId, updatedLesson)).subscribe({
        next: (response: any) => {
          console.log('Course updated successfully:', response);
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error('Error updating course:', err);
        }
      });
    }
  }
}
