import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Game, CreateGameRequest } from '../../../models/game.model';

export interface GameDialogData {
  game?: Game;
  featuredCount: number;
}

@Component({
  selector: 'app-game-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.css']
})
export class GameDialogComponent implements OnInit {
  game: CreateGameRequest;
  coverFile: File | null = null;
  musicFile: File | null = null;
  coverPreview: string | null = null;
  musicPreview: string | null = null;
  isEditMode = false;
  maxFeaturedReached = false;

  constructor(
    public dialogRef: MatDialogRef<GameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GameDialogData
  ) {
    this.game = {
      title: '',
      description: '',
      price: 0,
      genres: '',
      platforms: '',
      devTeam: '',
      publisher: '',
      coverImageUrl: '',
      stockQuantity: 0,
      featured: false
    };
  }

  ngOnInit() {
    if (this.data.game) {
      this.isEditMode = true;
      this.game = { ...this.data.game };
      if (this.data.game.coverImageUrl) {
        this.coverPreview = this.data.game.coverImageUrl;
      }
      if (this.data.game.musicUrl) {
        this.musicPreview = this.data.game.musicUrl;
      }
    }
    this.maxFeaturedReached = this.data.featuredCount >= 10;
  }

  onCoverFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.coverFile = file;
      this.createCoverPreview(file);
    }
  }

  onMusicFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.musicFile = file;
      this.createMusicPreview(file);
    }
  }

  createCoverPreview(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.coverPreview = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  createMusicPreview(file: File) {
    this.musicPreview = file.name;
  }

  removeCover() {
    this.coverFile = null;
    this.coverPreview = null;
    this.game.coverImageUrl = '';
  }

  removeMusic() {
    this.musicFile = null;
    this.musicPreview = null;
    this.game.musicUrl = '';
  }

  onFeaturedChange() {
    if (this.game.featured && this.data.featuredCount >= 10 && !this.isEditMode) {
      this.game.featured = false;
      alert('Cannot feature more than 10 games.');
    }
  }

  onSubmit() {
    if (this.game.featured && this.data.featuredCount >= 10 && !this.isEditMode) {
      alert('Cannot feature more than 10 games.');
      return;
    }

    this.dialogRef.close({
      game: this.game,
      coverFile: this.coverFile,
      musicFile: this.musicFile
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
} 