import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GameService } from '../../services/game.service';
import { CartService } from '../../services/cart.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  games: Game[] = [];
  searchTitle = '';
  searchGenre = '';
  searchPlatform = '';

  constructor(
    private gameService: GameService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getAllGames().subscribe(games => {
      this.games = games;
    });
  }

  search(): void {
    if (this.searchTitle) {
      this.gameService.searchGamesByTitle(this.searchTitle).subscribe(games => {
        this.games = games;
      });
    } else if (this.searchGenre) {
      this.gameService.searchGamesByGenre(this.searchGenre).subscribe(games => {
        this.games = games;
      });
    } else if (this.searchPlatform) {
      this.gameService.searchGamesByPlatform(this.searchPlatform).subscribe(games => {
        this.games = games;
      });
    } else {
      this.loadGames();
    }
  }

  clearSearch(): void {
    this.searchTitle = '';
    this.searchGenre = '';
    this.searchPlatform = '';
    this.loadGames();
  }

  addToCart(gameId: number): void {
    // For demo purposes, using user ID 1
    this.cartService.addToCart(1, gameId, 1).subscribe(() => {
      console.log('Added to cart');
    });
  }
} 