import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  games: Game[] = [];
  loading = false;
  error: string | null = null;

  @Output() cartChanged = new EventEmitter<void>();

  constructor(private gameService: GameService, private cartService: CartService) {}

  ngOnInit() {
    this.fetchGames();
  }

  fetchGames() {
    this.loading = true;
    this.gameService.getAllGames().subscribe({
      next: (games: Game[]) => {
        this.games = games;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load games.';
        this.loading = false;
      }
    });
  }

  getImage(url: string | null | undefined): string {
    return url && url.trim() !== '' ? url : 'https://via.placeholder.com/300x400?text=No+Image';
  }

  addToCart(game: Game) {
    this.cartService.addToCart(game);
    alert(`Added ${game.title} to cart!`);
    this.cartChanged.emit();
  }
} 