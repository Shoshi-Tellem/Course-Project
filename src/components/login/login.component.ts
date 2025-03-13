import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge, Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup
  failed: boolean = false

  errorEmailMessage = signal('');
  errorPasswordMessage = signal('');

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
    merge(this.loginForm.statusChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateErrorEmailMessage()
        this.updateErrorPasswordMessage()
      })
  }

  async onSubmit() {
    // try {
    //   await this.http.post("http://localhost:3000/api/auth/login", this.loginForm.value)
    //     .subscribe((response: any) => {
    //       console.log('User logged in successfully')
    //       this.userService.setUser(response)
    //     });
    // } catch (error) {
    //   console.error('Error logging in user', error)
    // }
    if (this.loginForm.valid) {
      try {
        await this.authService.login(this.loginForm.value);
        this.router.navigate(['/'])
      } catch (error) {
        this.failed = true
      }
    }
  }

  updateErrorEmailMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      this.errorEmailMessage.set('חובה להכניס אימייל');
    } else if (this.loginForm.get('email')?.hasError('email')) {
      this.errorEmailMessage.set('אימייל לא תקין');
    } else {
      this.errorEmailMessage.set('');
    }
  }

  updateErrorPasswordMessage() {
    if (this.loginForm.get('password')?.hasError('required')) {
      this.errorPasswordMessage.set('חובה להכניס סיסמה');
    } else if (this.loginForm.get('password')?.hasError('minlength')) {
      this.errorPasswordMessage.set('סיסמה קצרה מדי');
    } else {
      this.errorPasswordMessage.set('');
    }
  }
}
