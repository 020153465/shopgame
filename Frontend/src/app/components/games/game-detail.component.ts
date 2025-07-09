import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { CartService } from '../../services/cart.service';
import { Game } from '../../models/game.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  game: Game | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadGame();
  }

  loadGame() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    this.gameService.getGameById(id).subscribe({
      next: (game: Game) => {
        this.game = game;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load game.';
        this.loading = false;
      }
    });
  }

  addToCart() {
    if (this.game) {
      this.cartService.addToCart(this.game, 1);
      alert(`Added ${this.game.title} to cart!`);
    }
  }
} 