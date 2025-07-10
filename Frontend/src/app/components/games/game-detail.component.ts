import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { CartService } from '../../services/cart.service';
import { Game } from '../../models/game.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule, MatSnackBarModule],
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
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadGame();
  }

  loadGame() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    this.error = null;
    
    this.gameService.getGameById(id).subscribe({
      next: (game: Game) => {
        this.game = game;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load game details. Please try again.';
        this.loading = false;
        console.error('Error loading game:', err);
      }
    });
  }

  addToCart() {
    if (this.game) {
      this.cartService.addToCart(this.game, 1);
      this.snackBar.open(`Added ${this.game.title} to cart!`, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
    }
  }

  updateQuantity(gameId: number, quantity: number) {
    if (quantity <= 0) {
      this.cartService.removeFromCart(gameId);
    } else {
      const items = this.cartService.getCartItems();
      const idx = items.findIndex(item => item.game.id === gameId);
      if (idx > -1) {
        items[idx].quantity = quantity;
        localStorage.setItem('shopgame_cart', JSON.stringify(items));
      }
    }
  }
} 