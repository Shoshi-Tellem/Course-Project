import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { LessonService } from '../../services/lesson/lessons.service';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [ MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
  addLessonForm!: FormGroup;
  courseId!:string
  constructor(private activatedRoute: ActivatedRoute,public lessonService: LessonService, private fb: FormBuilder,    private router: Router
  ) {}

  ngOnInit(): void {
    // שליפה של ה-ID מהנתיב הראשי (parent route)
    this.activatedRoute.paramMap.subscribe(params => {
      this.courseId = params.get('id') || ''; 
    });    console.log("this.courseId:", this.courseId);
  
    this.addLessonForm = this.fb.group({
      lessonGroup: this.fb.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
      }),
    });
  }

  async onSubmit() {
    
    if (this.addLessonForm.valid) {
      const lesson: any = this.addLessonForm.value.lessonGroup;
      const {title, content}=lesson

     ;(await this.lessonService.createLesson(this.courseId, title, content)).subscribe({
    next: (response:any) => {      
      console.log(response);
      
      this.router.navigate([`/courses/${this.courseId}`]);
    },
    error: (err:any) => {
      console.error('Error adding course', err);
    }
  });

    }
  }
  
}