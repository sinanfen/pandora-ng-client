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
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  showRegisterModal = false;
  @ViewChild(RegisterModalComponent) registerModal?: RegisterModalComponent;
  constructor(
    private fb: FormBuilder,
    private httpService: HttpClientService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Giriş işlemleri burada yapılacak
      console.log(this.loginForm.value);
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
