import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any

  constructor() { }

  setUser(user: any) {
    console.log(user)
    sessionStorage.setItem('userId', user.userId)
    sessionStorage.setItem('token', user.token)
    sessionStorage.setItem('role', user.role)
    this.user = user
  }

  getUser() {
    return this.user
  }

  getToken() {
    const token = sessionStorage.getItem('token')
    return token ? token : ''
  }

  getUserId() {
    const userId = sessionStorage.getItem('userId')
    return userId ? userId : ''
  }

  getRole() {
    const role = sessionStorage.getItem('role')
    return role ? role : ''
  }
}
