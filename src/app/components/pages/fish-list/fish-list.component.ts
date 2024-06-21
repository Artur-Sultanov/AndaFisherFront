import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FishService } from '../../../services/fish.service';

@Component({
  selector: 'app-fish-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fish-list.component.html',
  styleUrl: './fish-list.component.css',
})
export class FishListComponent {
  fishes: any[] = [];
  id: string | null = null;

  constructor(private fishService: FishService) {}

  ngOnInit(): void {
    this.loadFishes();
  }
  loadFishes(): void {
    this.fishService.getFishes().subscribe({
      next: (data) => {
        this.fishes = data.map((fish: any) => ({
          ...fish,
          imageUrl: `assets/image_fish/${fish.id}.jpeg`,
        }));
        console.log('data', data);
        console.log('Fishes: ', this.fishes);
      },
      error: (error) => {
        console.error('Error fetching fishes: ', error);
      },
    });
  }
}
