import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RegisterModalComponent } from '../landing/register-modal.component';
import { HttpClientService } from '../../../../core/services/http-client.service';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from '../../../../models/users/user.dto';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserLoginDto } from '../../../../models/users/user-login.dto';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RegisterModalComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  showRegisterModal = false;
  @ViewChild(RegisterModalComponent) registerModal?: RegisterModalComponent;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpClientService,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const loginData: UserLoginDto = this.loginForm.value;

      this.httpService
        .post<{ success: boolean; token: string; message: string }>(
          'auth/login',
          loginData
        )
        .subscribe({
          next: (response) => {
            if (response.success) {
              localStorage.setItem('token', response.token);
              this.router.navigate(['/dashboard']);
            }
          },
          error: (error) => {
            console.error('Login failed:', error);
            // Handle error (show error message to user)
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  }

  onRegisterLinkClick(event: Event) {
    event.preventDefault();
    this.showRegisterModal = true;
  }

  closeRegisterModal() {
    this.showRegisterModal = false;
  }

  onRegister(user: any) {
    if (this.registerModal) this.registerModal.isLoading = true;

    this.httpService
      .post<{ success: boolean; data: UserDto; message: string }>(
        'api/Auth/register',
        user
      )
      .subscribe({
        next: (res) => {
          console.log('Registration response:', res);
          this.toastr.success(res.message || 'Kayıt başarılı!', 'Başarılı');
          this.closeRegisterModal();
        },
        error: (err) => {
          console.error('Registration error:', err);
          // Hatalar zaten HttpClientService içinde toastr ile gösteriliyor
          if (this.registerModal) this.registerModal.isLoading = false;
        },
      });
  }
}
