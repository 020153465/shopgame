import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-community-section',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatExpansionModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './community-community.component.html',
  styleUrls: ['./community-community.component.css']
})
export class CommunityCommunityComponent {
  faqs = [
    { q: 'How do I buy games?', a: 'Browse the shop, add games to your cart, and checkout securely with instant delivery.' },
    { q: 'Is my payment secure?', a: 'Yes! We use industry-standard encryption and secure payment gateways.' },
    { q: 'How do I contact support?', a: 'Use the contact form here or email us at support@shopgame.com.' },
    { q: 'Can I get a refund?', a: 'Refunds are available for eligible purchases within 14 days. See our policy for details.' }
  ];
  supportFormData = { name: '', email: '', message: '' };
  submitted = false;

  submitSupportForm() {
    this.submitted = true;
    setTimeout(() => this.submitted = false, 3000);
    this.supportFormData = { name: '', email: '', message: '' };
  }
} 