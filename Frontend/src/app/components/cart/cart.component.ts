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
  cartItems: (CartItem & { fading?: boolean, fadeIn?: boolean })[] = [];
  @Output() cartChanged = new EventEmitter<void>();
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.loadCart();
  }
  ngOnInit() {
    this.cartItems = this.cartService.getCartItems().map(item => ({ ...item, fading: false, fadeIn: true }));
    setTimeout(() => {
      this.cartItems.forEach(item => item.fadeIn = false);
    }, 600);
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
    const dialogRef = this.dialog.open(CartCheckoutDialog, {
      width: '420px',
      data: { cartItems: this.cartItems, total: this.getTotal() }
    });
    
    // Listen for dialog close to refresh cart if payment was successful
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Payment was successful, refresh cart
        this.loadCart();
        this.cartChanged.emit();
      }
    });
  }
  trackByGameId(index: number, item: CartItem) {
    return item.game.id;
  }
  animateRemove(gameId: number) {
    const idx = this.cartItems.findIndex(i => i.game.id === gameId);
    if (idx > -1) {
      this.cartItems[idx].fading = true;
      setTimeout(() => {
        this.removeFromCart(gameId);
      }, 380); // match fade-out duration
    }
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

  // Error states
  cardNumberError = '';
  cardNameError = '';
  cardExpError = '';
  cardCvcError = '';
  emailError = '';

  // Touched states
  cardNumberTouched = false;
  cardNameTouched = false;
  cardExpTouched = false;
  cardCvcTouched = false;
  emailTouched = false;

  constructor(
    public dialogRef: MatDialogRef<CartCheckoutDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService
  ) {}

  // --- Formatting Handlers ---
  onCardNumberInput(e: any) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    this.cardNumber = value;
    this.validateCardNumber();
  }
  onCardExpInput(e: any) {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.length > 4) value = value.substring(0, 4);
    if (value.length > 2) value = value.substring(0, 2) + '/' + value.substring(2);
    this.cardExp = value;
    this.validateCardExp();
  }
  onCardCvcInput(e: any) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 4);
    this.cardCvc = value;
    this.validateCardCvc();
  }
  onCardNameInput(e: any) {
    let value = e.target.value.replace(/[^A-Za-z\s]/g, '');
    this.cardName = value;
    this.validateCardName();
  }
  onEmailInput(e: any) {
    this.email = e.target.value;
    this.validateEmail();
  }

  // --- Blur Handlers ---
  onCardNumberBlur() { this.cardNumberTouched = true; this.validateCardNumber(); }
  onCardNameBlur() { this.cardNameTouched = true; this.validateCardName(); }
  onCardExpBlur() { this.cardExpTouched = true; this.validateCardExp(); }
  onCardCvcBlur() { this.cardCvcTouched = true; this.validateCardCvc(); }
  onEmailBlur() { this.emailTouched = true; this.validateEmail(); }

  // --- Validation ---
  validateCardNumber() {
    const digits = this.cardNumber.replace(/\s/g, '');
    if (digits.length !== 16) {
      this.cardNumberError = 'Card number must be 16 digits';
      return false;
    }
    this.cardNumberError = '';
    return true;
  }
  validateCardExp() {
    if (!/^\d{2}\/\d{2}$/.test(this.cardExp)) {
      this.cardExpError = 'Format MM/YY';
      return false;
    }
    const [mm, yy] = this.cardExp.split('/').map(Number);
    if (mm < 1 || mm > 12) {
      this.cardExpError = 'Invalid month';
      return false;
    }
    // Check not expired (assume current year 2000+)
    const now = new Date();
    const curYear = now.getFullYear() % 100;
    const curMonth = now.getMonth() + 1;
    if (yy < curYear || (yy === curYear && mm < curMonth)) {
      this.cardExpError = 'Card expired';
      return false;
    }
    this.cardExpError = '';
    return true;
  }
  validateCardCvc() {
    if (!/^\d{3,4}$/.test(this.cardCvc)) {
      this.cardCvcError = 'CVC must be 3 or 4 digits';
      return false;
    }
    this.cardCvcError = '';
    return true;
  }
  validateCardName() {
    if (!/^([A-Za-z]+\s){1,}[A-Za-z]+$/.test(this.cardName.trim())) {
      this.cardNameError = 'Enter first and last name';
      return false;
    }
    this.cardNameError = '';
    return true;
  }
  validateEmail() {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.email.trim())) {
      this.emailError = 'Invalid email address';
      return false;
    }
    this.emailError = '';
    return true;
  }

  isValid(): boolean {
    if (this.paymentType === 'credit') {
      return (
        this.validateCardNumber() &&
        this.validateCardName() &&
        this.validateCardExp() &&
        this.validateCardCvc()
      );
    } else if (this.paymentType === 'paypal') {
      return this.validateEmail();
    }
    return false;
  }

  pay() {
    if (!this.isValid()) return;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.success = true;
      this.cartService.clearCart();
      setTimeout(() => this.dialogRef.close(true), 1800);
    }, 1800);
  }
  close() {
    this.dialogRef.close();
  }
} 