import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
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
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form>
            <mat-form-field class="form-field">
              <mat-label>Username</mat-label>
              <input matInput [(ngModel)]="username" name="username" required>
            </mat-form-field>
            
            <mat-form-field class="form-field">
              <mat-label>Password</mat-label>
              <input matInput type="password" [(ngModel)]="password" name="password" required>
            </mat-form-field>
          </form>
        </mat-card-content>
        <mat-card-actions class="button-container">
          <button mat-raised-button color="primary" (click)="login()">Login</button>
          <button mat-button routerLink="/register">Register</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  login() {
    // For demo purposes, just log the credentials
    console.log('Login attempt:', { username: this.username, password: this.password });
    // In a real app, you would call an authentication service
  }
} 