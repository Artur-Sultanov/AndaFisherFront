import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FishService } from '../../../services/fish.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fish-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fish-detail.component.html',
  styleUrl: './fish-detail.component.css',
})
export class FishDetailComponent implements OnInit {
  fish: any;

  constructor(
    private route: ActivatedRoute,
    private fishService: FishService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id: ', id);
    if (id) {
      this.loadFish(id);
    }
  }
  loadFish(id: string) {
    this.fishService.getFish(id).subscribe({
      next: (data) => {
        this.fish = data;
        this.fish.imageUrl = `assets/image_fish/${data.id}.jpeg`;
        console.log('Fish', data);
      },
      error: (error) => {
        console.error('Error fetching fish: ', error);
      },
    });
  }
}
