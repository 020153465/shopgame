import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  featuredGames: Game[] = [];

  constructor(private router: Router, private gameService: GameService) {}

  ngOnInit() {
    this.gameService.getFeaturedGames().subscribe(games => {
      this.featuredGames = games;
    });
  }

  enterShop() {
    this.router.navigate(['/home']);
  }

  scrollToSection() {
    const section = document.getElementById('info-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getCoverUrl(game: Game): string {
    if (!game.coverImageUrl) return '';
    if (game.coverImageUrl.startsWith('http')) return game.coverImageUrl;
    return `/api/assets/covers/${game.coverImageUrl}`;
  }
} 