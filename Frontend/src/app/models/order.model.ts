import { User } from './user.model';
import { Game } from './game.model';

export interface Order {
  id: number;
  userId: number;
  user: User;
  totalAmount: number;
  status: OrderStatus;
  orderItems: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  orderId: number;
  gameId: number;
  game: Game;
  quantity: number;
  price: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface CreateOrderRequest {
  userId: number;
  orderItems: CreateOrderItemRequest[];
}

export interface CreateOrderItemRequest {
  gameId: number;
  quantity: number;
} 