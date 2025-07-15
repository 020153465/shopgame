import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule
  ],
  template: `
    <mat-toolbar color="primary" class="main-toolbar">
      <span class="brand" routerLink="/">🎮 ShopGame</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/">Discover</button>
      <button mat-button routerLink="/shop">Shop</button>
      <button mat-button routerLink="/cart">
        <mat-icon>shopping_cart</mat-icon>
        <span class="cart-label">Cart</span>
        <span *ngIf="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
      </button>
      <span class="spacer"></span>
      <button *ngIf="showThemeToggle" mat-icon-button (click)="toggleTheme()" [attr.aria-label]="isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'">
        <mat-icon>{{ isDarkTheme ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>
      <ng-container *ngIf="currentUser$ | async as user; else guestLinks">
        <button mat-button routerLink="/profile">
          <mat-icon>account_circle</mat-icon>
          {{ user.username }}
        </button>
        <button mat-button (click)="logout()">Logout</button>
        <button *ngIf="isAdmin(user)" mat-button routerLink="/admin">Admin</button>
      </ng-container>
      <ng-template #guestLinks>
        <button mat-button routerLink="/login">Login</button>
        <button mat-button routerLink="/register">Register</button>
      </ng-template>
    </mat-toolbar>
    <router-outlet (activate)="onRouteActivate($event)"></router-outlet>
  `,
  styles: [`
    .main-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
    }
    .brand {
      font-size: 1.5rem;
      font-weight: bold;
      cursor: pointer;
      text-decoration: none;
      color: white;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .cart-label {
      margin-left: 4px;
    }
    .cart-badge {
      background: #ff5252;
      color: white;
      border-radius: 50%;
      padding: 2px 8px;
      font-size: 0.8rem;
      margin-left: 4px;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'ShopGame';
  currentUser$ = this.authService.currentUser$;
  cartCount = 0;
  isDarkTheme = false;
  showThemeToggle = true;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.updateCartCount();
    window.addEventListener('storage', () => this.updateCartCount());
    // Theme initialization
    this.isDarkTheme = localStorage.getItem('theme') === 'dark';
    this.applyTheme();
    // Hide theme toggle on landing page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showThemeToggle = !(event.urlAfterRedirects === '/' || event.url === '/');
      }
    });
  }

  ngOnInit() {
    this.authService.loadCurrentUser();
  }

  isAdmin(user: User | null): boolean {
    return user?.role === 'ADMIN';
  }

  onRouteActivate(component: any) {
    if (component && component.cartChanged) {
      component.cartChanged.subscribe(() => this.updateCartCount());
    }
  }

  updateCartCount() {
    this.cartCount = this.cartService.getCartCount();
  }

  logout() {
    this.authService.logout();
    window.location.href = '/';
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    const body = document.body;
    if (this.isDarkTheme) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }
} 