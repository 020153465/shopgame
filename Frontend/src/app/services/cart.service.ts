import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';

export interface CartItem {
  game: Game;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageKey = 'shopgame_cart';

  getCartItems(): CartItem[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addToCart(game: Game, quantity: number = 1): void {
    const items = this.getCartItems();
    const idx = items.findIndex(item => item.game.id === game.id);
    if (idx > -1) {
      items[idx].quantity += quantity;
    } else {
      items.push({ game, quantity });
    }
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  removeFromCart(gameId: number): void {
    const items = this.getCartItems().filter(item => item.game.id !== gameId);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }

  getCartCount(): number {
    return this.getCartItems().reduce((sum, item) => sum + item.quantity, 0);
  }
} 