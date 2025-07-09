import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { GameService } from '../../services/game.service';
import { Game, CreateGameRequest } from '../../models/game.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  games: Game[] = [];
  displayedColumns: string[] = ['title', 'price', 'stock', 'actions'];
  newGame: CreateGameRequest = {
    title: '',
    description: '',
    price: 0,
    genres: '',
    platforms: '',
    devTeam: '',
    publisher: '',
    coverImageUrl: '',
    stockQuantity: 0
  };

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getAllGames().subscribe(games => {
      this.games = games;
    });
  }

  addGame(): void {
    this.gameService.createGame(this.newGame).subscribe(() => {
      this.loadGames();
      this.resetNewGame();
    });
  }

  deleteGame(id: number): void {
    this.gameService.deleteGame(id).subscribe(() => {
      this.loadGames();
    });
  }

  private resetNewGame(): void {
    this.newGame = {
      title: '',
      description: '',
      price: 0,
      genres: '',
      platforms: '',
      devTeam: '',
      publisher: '',
      coverImageUrl: '',
      stockQuantity: 0
    };
  }
} 