import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { CreateGameRequest } from '../../models/game.model';

@Component({
  selector: 'app-game-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent {
  game: CreateGameRequest = {
    title: '',
    description: '',
    price: 0,
    genres: '',
    platforms: '',
    devTeam: '',
    publisher: '',
    stockQuantity: 0,
    featured: false,
    minOs: '',
    minCpu: '',
    minRam: '',
    minGpu: '',
    minStorage: '',
    recOs: '',
    recCpu: '',
    recRam: '',
    recGpu: '',
    recStorage: ''
  };
  error: string | null = null;
  success: string | null = null;
  loading = false;

  constructor(private gameService: GameService) {}

  submit() {
    this.error = null;
    this.success = null;
    this.loading = true;
    // Ensure numeric fields are numbers
    this.game.price = Number(this.game.price);
    this.game.stockQuantity = Number(this.game.stockQuantity);
    this.gameService.createGame(this.game).subscribe({
      next: () => {
        this.success = 'Game created successfully!';
        this.loading = false;
      },
      error: err => {
        this.error = (err?.error?.message || err?.error || err?.message || 'Failed to create game.');
        this.loading = false;
      }
    });
  }
} 