import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem, AddToCartRequest, UpdateCartItemRequest } from '../models/cart.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) {}

  getCart(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/${userId}`);
  }

  addToCart(userId: number, gameId: number, quantity: number): Observable<CartItem> {
    const request: AddToCartRequest = { userId, gameId, quantity };
    return this.http.post<CartItem>(this.apiUrl, request);
  }

  updateQuantity(cartItemId: number, quantity: number): Observable<CartItem> {
    const request: UpdateCartItemRequest = { quantity };
    return this.http.put<CartItem>(`${this.apiUrl}/items/${cartItemId}`, request);
  }

  removeFromCart(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/items/${cartItemId}`);
  }

  clearCart(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
} 