import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

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
  template: `
    <div class="form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Register</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form>
            <mat-form-field class="form-field">
              <mat-label>Username</mat-label>
              <input matInput [(ngModel)]="username" name="username" required>
            </mat-form-field>
            
            <mat-form-field class="form-field">
              <mat-label>Email</mat-label>
              <input matInput type="email" [(ngModel)]="email" name="email" required>
            </mat-form-field>
            
            <mat-form-field class="form-field">
              <mat-label>First Name</mat-label>
              <input matInput [(ngModel)]="firstName" name="firstName" required>
            </mat-form-field>
            
            <mat-form-field class="form-field">
              <mat-label>Last Name</mat-label>
              <input matInput [(ngModel)]="lastName" name="lastName" required>
            </mat-form-field>
            
            <mat-form-field class="form-field">
              <mat-label>Password</mat-label>
              <input matInput type="password" [(ngModel)]="password" name="password" required>
            </mat-form-field>
          </form>
        </mat-card-content>
        <mat-card-actions class="button-container">
          <button mat-raised-button color="primary" (click)="register()">Register</button>
          <button mat-button routerLink="/login">Login</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `
})
export class RegisterComponent {
  username = '';
  email = '';
  firstName = '';
  lastName = '';
  password = '';

  register() {
    console.log('Register attempt:', { 
      username: this.username, 
      email: this.email, 
      firstName: this.firstName, 
      lastName: this.lastName, 
      password: this.password 
    });
  }
} 