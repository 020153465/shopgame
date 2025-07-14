import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule, MatSnackBarModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  loading = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
  }

  updateQuantity(gameId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(gameId);
    } else {
      const items = this.cartService.getCartItems();
      const idx = items.findIndex(item => item.game.id === gameId);
      if (idx > -1) {
        items[idx].quantity = quantity;
        localStorage.setItem('shopgame_cart', JSON.stringify(items));
        this.loadCart();
      }
    }
  }

  removeFromCart(gameId: number) {
    this.cartService.removeFromCart(gameId);
    this.loadCart();
    this.snackBar.open('Item removed from cart', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
    this.snackBar.open('Cart cleared', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.game.price * item.quantity, 0);
  }

  checkout() {
    if (!this.authService.isAuthenticated()) {
      this.snackBar.open('Please login to checkout', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.router.navigate(['/login']);
      return;
    }

    if (this.cartItems.length === 0) {
      this.snackBar.open('Your cart is empty', 'Close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      return;
    }

    this.loading = true;
    
    // Simulate checkout process
    setTimeout(() => {
      this.loading = false;
      this.snackBar.open('Order placed successfully! Thank you for your purchase.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
      
      // Clear cart after successful checkout
      this.cartService.clearCart();
      this.loadCart();
      
      // Redirect to home page
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }, 2000);
  }
} 