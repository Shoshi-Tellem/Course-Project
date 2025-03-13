import { Routes } from '@angular/router';
import { MockComponent } from '../components/mock/mock.component';
import { LoginComponent } from '../components/login/login.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { HomeComponent } from '../components/home/home.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { authGuard } from '../guards/auth/auth.guard';
import { AddCourseComponent } from '../components/add-course/add-course.component';
import { isTeacherGuard } from '../guards/isTeacher/is-teacher.guard';
import { ShowCourseComponent } from '../components/show-course/show-course.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';
import { HeaderComponent } from '../components/header/header.component';

export const routes: Routes = [
    {
        path: '', component: HeaderComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'mock', component: MockComponent },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignUpComponent },
            {
                path: 'courses', component: CoursesComponent, canActivate: [authGuard], children: [
                    { path: ':id', component: ShowCourseComponent }
                ]
            },
            { path: 'courses/:id/addLesson', component: AddLessonComponent },
            { path: 'addCourse', component: AddCourseComponent, canActivate: [authGuard, isTeacherGuard] },
        ]
    },
]