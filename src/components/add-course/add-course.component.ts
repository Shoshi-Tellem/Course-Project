import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CourseService } from '../../services/course/course.service';

@Component({
  selector: 'app-add-course',
  imports: [MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    // RouterLink,
    RouterLinkActive],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  addCourseForm!: FormGroup;

  constructor(public courseService: CourseService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.addCourseForm = this.fb.group({
      courseGroup: this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      }),
    });
  }

  async onSubmit() {
    if (this.addCourseForm.valid) {
      const course: any = this.addCourseForm.value.courseGroup;
      const { title, description } = course
        ; (await this.courseService.addCourse(title, description)).subscribe({
          next: (response: any) => {
            console.log(response.message);
            this.router.navigate(['']);

          },
          error: (err: any) => {
            console.error('Error adding course', err);
          }
        });

    }
  }
}
