import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CourseService } from '../../services/course/course.service';

@Component({
  selector: 'app-mock',
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mock.component.html',
  styleUrl: './mock.component.css'
})

export class MockComponent implements OnInit {
  courses: any[] = []

  constructor(private courseService: CourseService) { }
  
  ngOnInit() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data
    })
  }
}