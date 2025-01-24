import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeachService } from '../../../../core/services/beach.service';

@Component({
  selector: 'app-beach-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beach-detail.component.html',
  styleUrl: './beach-detail.component.css',
})
export class BeachDetailComponent implements OnInit {
  beach: any;
  fishes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private beachService: BeachService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id: ', id);
    if (id) {
      this.loadBeach(id);
      this.loadFishes(id);
    }
  }
  loadBeach(id: string): void {
    this.beachService.getBeach(id).subscribe({
      next: (data) => {
        this.beach = data;
        this.beach.imageUrl = `assets/image_beach/${data.id}.jpeg`;
      },
      error: (error) => {
        console.error('Error fetching beach: ', error);
      },
    });
  }
  loadFishes(id: string): void {
    this.beachService.getFishesByBeachId(id).subscribe({
      next: (fishes) => {
        this.fishes = fishes;
      },
      error: (error) => {
        console.error('Error fetching fishes: ', error);
      },
    });
  }
  openMaps(): void {
    if (this.beach && this.beach.location) {
      const url = this.beach.location;
      window.open(url, 'blank');
    } else {
      console.error('No location available for this beach.');
    }
  }
}
