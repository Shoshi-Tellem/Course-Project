import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  constructor(private http: HttpClient) { }
  private url="http://localhost:3000/api/courses"

  // Get all lessons by course ID
  async getLessonsByCourseId(courseId: string) {
    return await this.http.get<any>(`${this.url}/${courseId}/lessons`);
  }

  // שליפת שיעור לפי ID
  async getLessonById(id: string) {
    return await this.http.get(`${this.url}/${id}/lessons`);
  }

  // יצירת שיעור חדש
  async createLesson(courseId: string, title: string, content: string) {
    const body = { title, content,courseId };
    return await this.http.post(`${this.url}/${courseId}/lessons`, body);
  }

  // עדכון שיעור לפי ID
  async updateLesson(id: number,courseId:string, updates: any) {
    return await this.http.put(`${this.url}/${courseId}/lessons/${id}`, updates);
  }

  // מחיקת שיעור לפי ID
  async deleteLesson(id: number,courseId:string) {
    return await this.http.delete(`${this.url}/${courseId}/lessons/${id}`);
  }
}
