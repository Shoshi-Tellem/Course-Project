import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CourseService } from '../../services/course/course.service';
import { UserService } from '../../services/user/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ShowCourseComponent } from '../show-course/show-course.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { EditLessonComponent } from '../edit-lesson/edit-lesson.component';
import { LessonService } from '../../services/lesson/lessons.service';

@Component({
  selector: 'app-courses',
  imports: [MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    RouterModule,
    MatExpansionModule, ShowCourseComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})

export class CoursesComponent implements OnInit {
  courses: any[] = []
  studentCourses: any[] = []
  userId: string = ''
  role: string | null = ''
  courseId: string = '';
  course!: any;
  lessons: any[] = [];
  constructor(private courseService: CourseService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private lessonService: LessonService) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data
    })

    this.role = this.userService.getRole()
    console.log('role', this.role);

    this.userId = this.userService.getUserId()
    if (this.userId) {
      this.loadStudentCourses()
    }
    console.log('studentCourses', this.studentCourses)
  }

  showCourse() {
    const dialogRef = this.dialog.open(ShowCourseComponent)
  }

  async loadStudentCourses() {
    (await this.courseService.getStudentCourses(this.userId)).subscribe(courses => {
      this.studentCourses = courses
    });
  }

  async enrollCourse(courseId: string, event: MouseEvent) {
    event.stopPropagation();
    (await this.courseService.enrollStudent(courseId, this.userId!)).subscribe(() => {
      this.studentCourses.push({ courseId })
    });
  }

  async unenrollCourse(courseId: string, event: MouseEvent) {
    event.stopPropagation();
    (await this.courseService.unenrollStudent(courseId, this.userId!)).subscribe(() => {
      this.studentCourses = this.studentCourses.filter(course => course.courseId !== courseId)
    });
  }

  isEnrolled(courseId: number): boolean {
    return this.studentCourses.some(course => course.courseId === courseId);
  }

  editCourse(course: any, event: MouseEvent) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(EditCourseComponent, {
      data: { course },
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        console.log('Course was updated successfully!');
        await this.courseService.getCourses().subscribe(updatedCourses => {
          this.courses = updatedCourses
        });
      }
    });
  }

  async deleteCourse(id: number, event: MouseEvent) {
    event.stopPropagation();
    (await this.courseService.deleteCourse(id)).subscribe(
      (response) => {
        console.log('Course deleted successfully:', response);
        this.courses = this.courses.filter(course => course.id !== id)
      },
      (error) => {
        console.error('Error deleting course:', error);
      }
    );
  }

  async getLessons() {
    console.log("this.courseId:", this.courseId);
    (await this.lessonService.getLessonsByCourseId(this.courseId)).subscribe({
      next: (data: any) => {
        console.log("Data from server:", data)
        this.lessons = data;
      },
      error: (error: any) => {
        console.error('Error fetching courses:', error);

      }
    });
  }

  async getCourseDetails() {
    (await this.courseService.getCourseById(this.courseId)).subscribe({
      next: (data) => {
        this.course = data;
        console.log(this.course);
      },
      error: (error) => {
        console.error('Error fetching course:', error);
      }
    });
  }

  async deleteLesson(id: number) {
    (await this.lessonService.deleteLesson(id, this.courseId)).subscribe(
      (response: any) => {
        console.log('Course deleted successfully:', response)
        this.lessons = this.lessons.filter(l => l.id !== id)

      },
      (error: any) => {
        console.error('Error deleting course:', error)
      }
    );
  }

  editLesson(lesson: any) {
    const dialogRef = this.dialog.open(EditLessonComponent, {
      data: { lesson },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Course was updated successfully!');
        this.getLessons(); // רענון קורסים
      }
    });
  }
}