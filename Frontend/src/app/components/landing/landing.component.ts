import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommunityCommunityComponent } from './community-community.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatProgressSpinnerModule, RouterLink, MatExpansionModule, FormsModule, MatFormFieldModule, MatInputModule, CommunityCommunityComponent
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  featuredGames: Game[] = [];
  games: Game[] = [];
  filteredGames: Game[] = [];
  loading = false;
  error: string | null = null;
  selectedGenre: string | null = null;
  genres: string[] = ['RPG', 'Action', 'Adventure', 'Strategy', 'Sports', 'Shooter', 'Indie'];

  // New interactive landing properties
  overviewSteps = [
    { icon: 'insights', label: 'Stats', sectionId: 'how-it-works-section' },
    { icon: 'star', label: 'Features', sectionId: 'features-section' },
    { icon: 'explore', label: 'Discovery', sectionId: 'discovery-section' },
    { icon: 'groups', label: 'Community', sectionId: 'community-section' },
    { icon: 'shopping_cart', label: 'Shop', sectionId: 'cta-section' }
  ];
  showSectionNav = false;
  sectionNavMenuOpen = false;
  showBackToTop = false;

  // New: How it works steps
  howItWorksSteps = [
    { icon: 'search', title: 'Browse', desc: 'Explore thousands of games by genre, platform, or popularity.' },
    { icon: 'add_shopping_cart', title: 'Add to Cart', desc: 'Add your favorite games to your cart with one click.' },
    { icon: 'credit_card', title: 'Checkout', desc: 'Securely purchase your games with instant digital delivery.' },
    { icon: 'sports_esports', title: 'Play Instantly', desc: 'Download and play your new games right away!' }
  ];

  // New: Feature highlights
  features = [
    { icon: 'collections', title: 'Huge Collection', desc: 'Access thousands of games across all platforms and genres.' },
    { icon: 'bolt', title: 'Instant Download', desc: 'Get your games instantly after purchase, no waiting.' },
    { icon: 'security', title: 'Secure Shopping', desc: 'Your data is protected with industry-leading security.' },
    { icon: 'local_offer', title: 'Best Prices', desc: 'Competitive pricing with regular sales and discounts.' },
    { icon: 'cloud_upload', title: 'Local Assets', desc: 'All covers and music are stored locally for fast, reliable access.' },
    { icon: 'admin_panel_settings', title: 'Admin Panel', desc: 'Powerful admin tools for managing games, users, and orders.' }
  ];

  // New: Current year for footer
  currentYear: number = new Date().getFullYear();

  // FAQ for community section
  faqs = [
    { q: 'How do I buy games?', a: 'Browse the shop, add games to your cart, and checkout securely with instant delivery.' },
    { q: 'Is my payment secure?', a: 'Yes! We use industry-standard encryption and secure payment gateways.' },
    { q: 'How do I contact support?', a: 'Use the contact form here or email us at support@shopgame.com.' },
    { q: 'Can I get a refund?', a: 'Refunds are available for eligible purchases within 14 days. See our policy for details.' }
  ];
  supportFormData = { name: '', email: '', message: '' };

  submitSupportForm() {
    this.snackBar.open('Thank you! Our support team will get back to you soon.', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
    this.supportFormData = { name: '', email: '', message: '' };
  }

  constructor(
    private router: Router, 
    private gameService: GameService,
    private authService: AuthService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log('Landing component initialized');
    console.log('Current URL:', window.location.href);
    console.log('Component selector:', 'app-landing');
    this.loadFeaturedGames();
    this.loadAllGames();
    this.initializeScrollAnimations();
    this.setupScrollListeners();
    // Ensure AOS sections are visible on first render
    setTimeout(() => this.handleScrollAnimations(), 100);
    // Fallback: forcibly show all [data-aos] elements after 1s
    setTimeout(() => {
      const elements = document.querySelectorAll('[data-aos]');
      elements.forEach(el => el.classList.add('aos-animate'));
    }, 1000);
  }

  initializeScrollAnimations() {
    // Add scroll event listener for smooth animations
    window.addEventListener('scroll', () => {
      this.handleScrollAnimations();
    });
  }

  handleScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        element.classList.add('aos-animate');
      }
    });
  }

  loadFeaturedGames() {
    this.gameService.getFeaturedGames().subscribe(games => {
      this.featuredGames = games;
    });
  }

  loadAllGames() {
    this.loading = true;
    this.gameService.getAllGames().subscribe({
      next: games => {
        this.games = games;
        this.filteredGames = games;
        this.loading = false;
      },
      error: error => {
        this.error = 'Failed to load games';
        this.loading = false;
        console.error('Error loading games:', error);
      }
    });
  }

  selectGenre(genre: string) {
    if (this.selectedGenre === genre) {
      this.selectedGenre = null;
      this.filteredGames = this.games;
    } else {
      this.selectedGenre = genre;
      this.filteredGames = this.games.filter(game =>
        game.genres && game.genres.toLowerCase().includes(genre.toLowerCase())
      );
    }
  }

  enterShop() {
    this.router.navigate(['/shop']);
  }

  scrollToSection() {
    const section = document.getElementById('how-it-works-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getCoverUrl(game: Game): string {
    if (game.coverImageFilename) {
      return `${environment.assetsUrl}/covers/${game.coverImageFilename}`;
    }
    
    // Fallback to placeholder for any game without local filename
    return `${environment.assetsUrl}/covers/placeholder.jpg`;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
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

    // Add to cart using the cart service
    this.cartService.addToCart(game, 1);
    this.snackBar.open(`${game.title} added to cart!`, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  // Section navigation logic
  setupScrollListeners() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || window.pageYOffset;
      this.showSectionNav = scrollY > window.innerHeight * 0.5;
      this.showBackToTop = scrollY > window.innerHeight * 0.7;
    });
  }

  scrollTo(sectionId: string) {
    // Special handling for community-section (full-bg wrapper)
    let section = document.getElementById(sectionId);
    if (!section && sectionId === 'community-section') {
      section = document.querySelector('.community-section-full-bg') as HTMLElement;
    }
    if (!section && sectionId === 'cta-section') {
      section = document.querySelector('.cta-section') as HTMLElement;
    }
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'shop' || sectionId === '/shop') {
      this.router.navigate(['/shop']);
    }
  }

  toggleSectionNavMenu() {
    this.sectionNavMenuOpen = !this.sectionNavMenuOpen;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.sectionNavMenuOpen = false;
  }

  // Add this method to compute optimal columns for discovery section
  getDiscoveryColumns(): number {
    const n = this.featuredGames.length;
    if (n <= 2) return n; // 1 or 2 games: 1 or 2 columns
    if (n === 3) return 3;
    if (n === 4) return 2;
    if (n === 5) return 3;
    if (n === 6) return 3;
    if (n === 7) return 4;
    if (n === 8) return 4;
    if (n === 9) return 3;
    if (n === 10) return 5;
    if (n === 11) return 4;
    if (n === 12) return 4;
    if (n === 13) return 5;
    if (n === 14) return 5;
    if (n === 15) return 5;
    return Math.min(5, Math.ceil(Math.sqrt(n))); // fallback for larger numbers
  }

  // Returns true if all cards should be displayed in a single row
  shouldSingleRow(): boolean {
    // You can adjust the threshold (5) based on card width and section width
    return this.featuredGames.length > 0 && this.featuredGames.length <= 5;
  }
} 