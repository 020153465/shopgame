import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    // For demo purposes, using user ID 1
    this.cartService.getCart(1).subscribe(items => {
      this.cartItems = items;
    });
  }

  updateQuantity(cartItemId: number, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(cartItemId, quantity).subscribe(() => {
        this.loadCart();
      });
    }
  }

  removeFromCart(cartItemId: number): void {
    this.cartService.removeFromCart(cartItemId).subscribe(() => {
      this.loadCart();
    });
  }

  clearCart(): void {
    this.cartService.clearCart(1).subscribe(() => {
      this.loadCart();
    });
  }

  checkout(): void {
    console.log('Proceeding to checkout...');
    // In a real app, this would navigate to a checkout page
  }
} 