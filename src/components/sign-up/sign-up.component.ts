import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSelectModule, MatOptionModule, MatIconModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm: FormGroup
  failed: boolean = false

  errorEmailMessage = signal('');
  errorPasswordMessage = signal('');

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signUpForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      role: new FormControl('', [Validators.required])
    })
  }

  async onSubmit() {
    try {
      await this.authService.signUp(this.signUpForm.value)
      this.router.navigate([''])
    } catch (error) {
      this.failed = true
    }
  }
}