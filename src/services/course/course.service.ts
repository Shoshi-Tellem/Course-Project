import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  course: any = ''
  private url = `http://localhost:3000/api/courses`
  constructor(private http: HttpClient, private userService: UserService) { }

  getCourses() {
    return this.http.get<any[]>(this.url)
  }

  async addCourse(title: string, description: string) {
    const token = sessionStorage.getItem('token')
    const teacherId: number = token ? +token : 0
    return await this.http.post(this.url, { title, description, teacherId })
  }

  async getCourseById(id: string) {
    return await this.http.get(`${this.url}/${id}`);
  }

  async updateCourse(id: string, updates: any) {
    return await this.http.put(`${this.url}/${id}`, updates)
  }

  async deleteCourse(id: number) {
    return await this.http.delete(`${this.url}/${id}`);
  }

  async enrollStudent(courseId: string, userId: string) {

    return this.http.post(`${this.url}/${courseId}/enroll`, { userId });
  }

  async unenrollStudent(courseId: string, userId: string) {

    return await this.http.delete(`${this.url}/${courseId}/unenroll`, { body: { userId } });
  }

  async getStudentCourses(studentId: string) {
    return await this.http.get<any>(`${this.url}/student/${studentId}`);
  }
}
