import { Game } from './game.model';

export interface CartItem {
  id: number;
  userId: number;
  gameId: number;
  quantity: number;
  game: Game;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddToCartRequest {
  userId: number;
  gameId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
} 