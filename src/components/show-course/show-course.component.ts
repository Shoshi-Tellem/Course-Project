import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';  // ✅ מספיק כדי להשתמש ב-[routerLink]
import { BehaviorSubject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from '../../services/course/course.service';
import { LessonService } from '../../services/lesson/lessons.service';
import { EditLessonComponent } from '../edit-lesson/edit-lesson.component';

@Component({
  selector: 'app-show-course',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, MatIconModule], // ✅ RouterModule מכסה את כל הדיירקטיבות של נתיבים
  templateUrl: './show-course.component.html',
  styleUrl: './show-course.component.css'
})
export class ShowCourseComponent implements OnInit {
  courseId: string = '';
  course!: any;
  lessons: any[] = [];
  role: string = sessionStorage.getItem('role') || ''

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private lessonService: LessonService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.courseId = params.get('id') || '';
      if (this.courseId) {
        this.getCourseDetails();
        this.getLessons();
      }

    });

  }

  async getLessons(): Promise<void> {
    console.log("this.courseId:", this.courseId);
    (await this.lessonService.getLessonsByCourseId(this.courseId)).subscribe({
      next: (data: any) => {
        console.log("Data from server:", data); // הוסף את זה
        this.lessons = data;
      },
      error: (error: any) => {
        console.error('Error fetching courses:', error);

      }
    });
  }

  async getCourseDetails(): Promise<void> {
    (await this.courseService.getCourseById(this.courseId)).subscribe({
      next: (data: any) => {
        this.course = data;
        console.log(this.course);
      },
      error: (error: any) => {
        console.error('Error fetching course:', error);
      }
    });
  }

  async deleteLesson(id: number) {
    (await this.lessonService.deleteLesson(id, this.courseId)).subscribe(
      (response: any) => {
        console.log('Course deleted successfully:', response);
        this.lessons = this.lessons.filter(l => l.id !== id);

      },
      (error: any) => {
        console.error('Error deleting course:', error);
      }
    );
  }

  editLesson(lesson: any) {
    const dialogRef = this.dialog.open(EditLessonComponent, {
      data: { lesson }, // שולחים את הקורס למודל
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Course was updated successfully!');
        this.getLessons(); // רענון קורסים
      }
    });
  }
}