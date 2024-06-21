import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-harmony-haven',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './harmony-haven.component.html',
  styleUrl: './harmony-haven.component.css',
})
export class HarmonyHavenComponent {
  selectedLanguage: string = 'ru';

  setLanguage(language: string): void {
    this.selectedLanguage = language;
  }
}
