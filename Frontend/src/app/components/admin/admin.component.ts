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
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Game, CreateGameRequest } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { GameDialogComponent } from './game-dialog/game-dialog.component';
import { environment } from '../../../environments/environment';

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
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User | null = null;
  editMode = false;
  userRoles = Object.values(UserRole);
  error: string | null = null;
  success: string | null = null;
  loading = false;
  searchTerm = '';
  activeTab: 'users' | 'games' = 'users';
  games: Game[] = [];
  filteredGames: Game[] = [];
  gameSearchTerm = '';
  gameLoading = false;
  gameError: string | null = null;
  gameSuccess: string | null = null;
  displayedGameColumns: string[] = ['cover', 'title', 'price', 'stock', 'featured', 'actions'];

  constructor(
    private userService: UserService,
    private gameService: GameService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchUsers();
    this.fetchGames();
  }

  fetchUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: users => {
        this.users = users;
        this.applyFilter();
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load users.';
        this.loading = false;
      }
    });
  }

  applyFilter() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredUsers = this.users;
      return;
    }
    this.filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }

  getUserInitials(user: User): string {
    if (user.firstName && user.lastName) {
      return user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();
    }
    if (user.username) {
      return user.username.slice(0, 2).toUpperCase();
    }
    return '?';
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

  fetchGames() {
    this.gameLoading = true;
    this.gameService.getAllGames().subscribe({
      next: games => {
        this.games = games;
        this.applyGameFilter();
        this.gameLoading = false;
      },
      error: err => {
        console.error('Fetch games error:', err);
        this.gameError = 'Failed to load games.';
        this.gameLoading = false;
      }
    });
  }

  applyGameFilter() {
    const term = this.gameSearchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredGames = this.games;
      return;
    }
    this.filteredGames = this.games.filter(game =>
      game.title.toLowerCase().includes(term) ||
      game.genres.toLowerCase().includes(term) ||
      game.platforms.toLowerCase().includes(term)
    );
  }

  openGameDialog(game?: Game) {
    const dialogRef = this.dialog.open(GameDialogComponent, {
      width: '600px',
      data: { game, featuredCount: this.games.filter(g => g.featured).length }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (game) {
          this.updateGame(game.id, result);
        } else {
          this.createGame(result);
        }
      }
    });
  }

  createGame(gameData: any) {
    this.gameService.createGame(gameData.game, gameData.coverFile, gameData.musicFile).subscribe({
      next: () => {
        this.fetchGames();
        this.snackBar.open('Game created successfully!', 'Close', { duration: 3000 });
      },
      error: err => {
        this.gameError = err?.error || 'Failed to create game.';
        this.snackBar.open(this.gameError || 'Failed to create game.', 'Close', { duration: 5000 });
      }
    });
  }

  updateGame(id: number, gameData: any) {
    this.gameService.updateGame(id, gameData.game, gameData.coverFile, gameData.musicFile).subscribe({
      next: () => {
        this.fetchGames();
        this.snackBar.open('Game updated successfully!', 'Close', { duration: 3000 });
      },
      error: err => {
        this.gameError = err?.error || 'Failed to update game.';
        this.snackBar.open(this.gameError || 'Failed to update game.', 'Close', { duration: 5000 });
      }
    });
  }

  deleteGame(game: Game) {
    if (!confirm(`Delete game "${game.title}"?`)) return;
    
    this.gameService.deleteGame(game.id).subscribe({
      next: () => {
        this.fetchGames();
        this.snackBar.open('Game deleted successfully!', 'Close', { duration: 3000 });
      },
      error: err => {
        this.gameError = err?.error || 'Failed to delete game.';
        this.snackBar.open(this.gameError || 'Failed to delete game.', 'Close', { duration: 5000 });
      }
    });
  }

  getAssetUrl(filename: string, type: 'cover' | 'music'): string {
    if (!filename) return `${environment.apiUrl}/assets/covers/placeholder.jpg`;
    
    // Only use local filenames - never fallback to external URLs
    if (filename.startsWith('http')){
      return `${environment.apiUrl}/assets/covers/placeholder.jpg`;
    }
    
    return `${environment.apiUrl}/assets/${type === 'cover' ? 'covers' : 'music'}/${filename}`;
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }
} 