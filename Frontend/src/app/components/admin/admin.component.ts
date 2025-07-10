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
  success: string | null = null;
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
    // Create a copy without the password field to prevent accidental password changes
    this.selectedUser = { 
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    this.editMode = false;
    this.error = null;
    this.success = null;
  }

  enableEdit() {
    this.editMode = true;
  }

  saveUser() {
    if (!this.selectedUser) return;
    
    // Create update object without password field
    const updateData = {
      username: this.selectedUser.username,
      email: this.selectedUser.email,
      firstName: this.selectedUser.firstName,
      lastName: this.selectedUser.lastName,
      role: this.selectedUser.role
    };
    
    this.userService.updateUser(this.selectedUser.id, updateData).subscribe({
      next: updated => {
        this.editMode = false;
        this.fetchUsers();
        this.error = null;
        this.success = 'User updated successfully!';
        // Clear success message after 3 seconds
        setTimeout(() => this.success = null, 3000);
      },
      error: err => {
        this.error = 'Failed to update user.';
        this.success = null;
      }
    });
  }

  deleteUser(user: User) {
    if (!confirm(`Delete user ${user.username}?`)) return;
    this.userService.deleteUser(user.id).subscribe({
      next: (message) => {
        this.error = null;
        this.success = 'User deleted successfully!';
        this.fetchUsers();
        setTimeout(() => this.success = null, 3000);
      },
      error: (err) => {
        // Log the error for debugging
        console.error('Delete user error:', err);
        // Show more details if available
        this.error = err?.error?.message || err?.message || 'Failed to delete user.';
        this.success = null;
      }
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.error = null;
    this.success = null;
    if (this.selectedUser) {
      this.selectUser(this.selectedUser);
    }
  }
} 