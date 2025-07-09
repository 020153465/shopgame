import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { User, UserRole } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  editMode = false;
  userRoles = Object.values(UserRole);
  error: string | null = null;
  loading = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: users => {
        this.users = users;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load users.';
        this.loading = false;
      }
    });
  }

  selectUser(user: User) {
    this.selectedUser = { ...user };
    this.editMode = false;
    this.error = null;
  }

  enableEdit() {
    this.editMode = true;
  }

  saveUser() {
    if (!this.selectedUser) return;
    this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
      next: updated => {
        this.editMode = false;
        this.fetchUsers();
      },
      error: err => {
        this.error = 'Failed to update user.';
      }
    });
  }

  deleteUser(user: User) {
    if (!confirm(`Delete user ${user.username}?`)) return;
    this.userService.deleteUser(user.id).subscribe({
      next: () => this.fetchUsers(),
      error: () => this.error = 'Failed to delete user.'
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.error = null;
    if (this.selectedUser) {
      this.selectUser(this.selectedUser);
    }
  }
} 