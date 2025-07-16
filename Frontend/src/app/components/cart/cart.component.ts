import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: CartItem[] = [];
  @Output() cartChanged = new EventEmitter<void>();
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.loadCart();
  }
  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.cartChanged.emit();
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  getTotal(): string {
    const total = this.cartItems.reduce((sum, item) => sum + item.game.price * item.quantity, 0);
    return total.toFixed(2);
  }
  updateQuantity(gameId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(gameId);
    } else {
      this.cartService.addToCart(this.cartItems.find(i => i.game.id === gameId)!.game, quantity - this.cartItems.find(i => i.game.id === gameId)!.quantity);
      this.loadCart();
      this.cartChanged.emit();
    }
  }
  removeFromCart(gameId: number) {
    this.cartService.removeFromCart(gameId);
    this.loadCart();
    this.cartChanged.emit();
  }
  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
    this.cartChanged.emit();
  }
  openCheckout() {
    this.dialog.open(CartCheckoutDialog, {
      width: '420px',
      data: { cartItems: this.cartItems, total: this.getTotal() }
    });
  }
}

@Component({
  selector: 'cart-checkout-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.css']
})
export class CartCheckoutDialog {
  paymentType = 'credit';
  cardNumber = '';
  cardName = '';
  cardExp = '';
  cardCvc = '';
  email = '';
  success = false;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<CartCheckoutDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  pay() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.success = true;
      setTimeout(() => this.dialogRef.close(true), 1800);
    }, 1800);
  }
  close() {
    this.dialogRef.close();
  }
} 