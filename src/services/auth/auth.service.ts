import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `http://localhost:3000/api/auth`
  constructor(private http: HttpClient, private userService: UserService) { }

  // async login(value: any): Promise<void> {
  //   try {
  //     const response: any = await this.http.post(`${this.url}/login`, value).toPromise();
  //     console.log('User logged in successfully');
  //     sessionStorage.setItem('token', response.token);
  //     this.userService.setUser(response);
  //   } catch (error) {
  //     throw error
  //   }
  // }
  async login(value: any): Promise<void> {
    try {
      const response: any = await firstValueFrom(this.http.post(`${this.url}/login`, value));
      console.log('User logged in successfully');
      this.userService.setUser(response);
    } catch (error) {
      console.error('Error logging in user', error);
      throw error
    }
  } 

  // async signUp(value: any): Promise<void> {
  //   try {
  //     const response: any = await firstValueFrom(
  //       this.http.post(`${this.url}/register`, value).pipe(
  //         catchError(error => {
  //           console.error('Registration failed', error);
  //           return throwError(error); // זורק את השגיאה
  //         })
  //       )
  //     );
  //     console.log('User registered successfully', response);
  //     if (typeof window !== 'undefined') {
  //       sessionStorage.setItem('token', response.token);
  //       sessionStorage.setItem('userId', response.userId);
  //     }
  //     this.userService.setUser(response);
  //   } catch (error) {
  //     console.error('Error registering user', error);
  //     throw error
  //   }
  // }  
  async signUp(value: any): Promise<void> {
    try {
      const response: any = await firstValueFrom(this.http.post(`${this.url}/register`, value));
      console.log('User registered successfully', response);
      this.userService.setUser(response);
    } catch (error) {
      console.error('Error registering user', error);
      throw error;
    }
  }
  
}
