import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  firstName = '';
  lastName = '';
  password = '';
  error: string | null = null;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.error = null;
    this.loading = true;
    const userData: RegisterRequest = {
      username: this.username,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password
    };
    this.authService.register(userData).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: err => {
        this.loading = false;
        this.error = err.error?.message || 'Registration failed. Please check your input.';
      }
    });
  }
} 