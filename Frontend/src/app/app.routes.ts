import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { GameDetailComponent } from './components/games/game-detail.component';
import { ShopComponent } from './components/games/shop.component';
import { LandingComponent } from './components/landing/landing.component';
import { GameCreateComponent } from './components/games/game-create.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'shop', component: ShopComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'games/create', component: GameCreateComponent },
  { path: 'game/:id', component: GameDetailComponent },
  { path: '**', redirectTo: '' }
]; 