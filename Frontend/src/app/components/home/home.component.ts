import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  games: Game[] = [];
  featuredGames: Game[] = [];
  loading = false;
  error: string | null = null;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.fetchGames();
  }

  fetchGames() {
    this.loading = true;
    this.gameService.getAllGames().subscribe({
      next: (games: Game[]) => {
        this.games = games;
        this.featuredGames = games.slice(0, 3); // Show first 3 as featured
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load games.';
        this.loading = false;
      }
    });
  }
} 