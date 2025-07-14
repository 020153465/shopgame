import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
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
    RouterLink,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  games: Game[] = [];
  loading = false;
  error: string | null = null;
  page = 0;
  pageSize = 8;
  totalPages = 1;
  searchTerm = '';
  selectedGenre = '';
  selectedPlatform = '';
  selectedPublisher = '';
  selectedDevTeam = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  featured: boolean | null = null;
  inStock: boolean | null = null;
  sortBy = 'createdAt';
  sortDir = 'desc';
  genres = ['RPG', 'Action', 'Adventure', 'Strategy', 'Sports', 'Shooter', 'Indie'];
  platforms = ['PC', 'PS4', 'PS5', 'Xbox One', 'Xbox Series X', 'Nintendo Switch'];
  publishers = [];
  devTeams = [];

  @Output() cartChanged = new EventEmitter<void>();

  constructor(
    private gameService: GameService, 
    private cartService: CartService, 
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchGames();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  fetchGames() {
    this.loading = true;
    const params: any = {
      title: this.searchTerm,
      genre: this.selectedGenre,
      platform: this.selectedPlatform,
      publisher: this.selectedPublisher,
      devTeam: this.selectedDevTeam,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      featured: this.featured,
      inStock: this.inStock,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
      page: this.page,
      size: this.pageSize
    };
    this.gameService.filterAndSortGames(params).subscribe({
      next: (res) => {
        this.games = res.content;
        this.totalPages = res.totalPages;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load games.';
        this.loading = false;
      }
    });
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.page = 0;
    this.fetchGames();
  }

  onGenreChange(genre: string) {
    this.selectedGenre = genre;
    this.page = 0;
    this.fetchGames();
  }

  // Add similar handlers for platform, publisher, devTeam, minPrice, maxPrice, featured, inStock, sortBy, sortDir
  onPlatformChange(platform: string) {
    this.selectedPlatform = platform;
    this.page = 0;
    this.fetchGames();
  }
  onPublisherChange(publisher: string) {
    this.selectedPublisher = publisher;
    this.page = 0;
    this.fetchGames();
  }
  onDevTeamChange(devTeam: string) {
    this.selectedDevTeam = devTeam;
    this.page = 0;
    this.fetchGames();
  }
  onPriceChange(min: number | null, max: number | null) {
    this.minPrice = min;
    this.maxPrice = max;
    this.page = 0;
    this.fetchGames();
  }
  onFeaturedChange(val: boolean | null) {
    this.featured = val;
    this.page = 0;
    this.fetchGames();
  }
  onInStockChange(val: boolean | null) {
    this.inStock = val;
    this.page = 0;
    this.fetchGames();
  }
  onSortChange(sortBy: string, sortDir: string) {
    this.sortBy = sortBy;
    this.sortDir = sortDir;
    this.page = 0;
    this.fetchGames();
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.fetchGames();
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.fetchGames();
    }
  }

  getImage(url: string | null | undefined): string {
    return url && url.trim() !== '' ? url : 'https://via.placeholder.com/300x400?text=No+Image';
  }

  addToCart(game: Game) {
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

    this.cartService.addToCart(game);
    this.snackBar.open(`Added ${game.title} to cart!`, 'Close', {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
    this.cartChanged.emit();
  }

  searchGames() {
    this.page = 0;
    this.fetchGames();
  }

  filterByGenre() {
    this.page = 0;
    this.fetchGames();
  }

  viewGameDetails(gameId: number) {
    this.router.navigate(['/game', gameId]);
  }
} 