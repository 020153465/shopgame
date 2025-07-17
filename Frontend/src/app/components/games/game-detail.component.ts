import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Game } from '../../models/game.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

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
  recommendedGames: Game[] = [];
  recommendationsLoading = false;
  recommendationsError: string | null = null;
  private routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe(() => {
      this.loadGame();
    });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  loadGame() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    this.error = null;
    this.recommendationsLoading = true;
    this.recommendationsError = null;
    this.gameService.getGameById(id).subscribe({
      next: (game: Game) => {
        this.game = game;
        this.loading = false;
        this.fetchRecommendations(id);
      },
      error: (err) => {
        this.error = 'Failed to load game details. Please try again.';
        this.loading = false;
        this.recommendationsLoading = false;
        console.error('Error loading game:', err);
      }
    });
  }

  fetchRecommendations(id: number) {
    this.gameService.getRecommendedGames(id, 4).subscribe({
      next: (games: Game[]) => {
        this.recommendedGames = games;
        this.recommendationsLoading = false;
      },
      error: (err) => {
        this.recommendationsError = 'Failed to load recommendations.';
        this.recommendationsLoading = false;
        console.error('Error loading recommendations:', err);
      }
    });
  }

  goToGame(gameId: number) {
    this.router.navigate(['/game', gameId]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addToCart() {
    if (!this.isAuthenticated()) {
      this.snackBar.open('Please login to add items to cart', 'Login', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }).onAction().subscribe(() => {
        this.router.navigate(['/login']);
      });
      return;
    }

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

  // Returns the cover image path for a game
  getCoverPath(game: Game | null): string {
    if (!game) return `${environment.assetsUrl}/covers/placeholder.jpg`;
    
    // Only use local filename - never fallback to external URLs
    if (game.coverImageFilename) {
      return `${environment.assetsUrl}/covers/${game.coverImageFilename}`;
    }
    
    // Fallback to placeholder for any game without local filename
    return `${environment.assetsUrl}/covers/placeholder.jpg`;
  }

  // Error handler for <img> tag: fallback to placeholder
  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.onerror = null; // Prevent infinite loop
    img.src = `${environment.assetsUrl}/covers/placeholder.jpg`;
  }
} 