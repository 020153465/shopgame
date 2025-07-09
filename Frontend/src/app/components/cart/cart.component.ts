import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
  }

  updateQuantity(gameId: number, quantity: number) {
    const items = this.cartService.getCartItems();
    const idx = items.findIndex(item => item.game.id === gameId);
    if (idx > -1) {
      items[idx].quantity = quantity;
      localStorage.setItem('shopgame_cart', JSON.stringify(items));
      this.loadCart();
    }
  }

  removeFromCart(gameId: number) {
    this.cartService.removeFromCart(gameId);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.game.price * item.quantity, 0);
  }
} 