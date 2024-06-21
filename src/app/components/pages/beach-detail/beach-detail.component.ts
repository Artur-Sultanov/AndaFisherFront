import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeachService } from '../../../services/beach.service';

@Component({
  selector: 'app-beach-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beach-detail.component.html',
  styleUrl: './beach-detail.component.css',
})
export class BeachDetailComponent implements OnInit {
  beach: any;

  constructor(
    private route: ActivatedRoute,
    private beachService: BeachService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id: ', id);
    if (id) {
      this.loadBeach(id);
    }
  }
  loadBeach(id: string): void {
    this.beachService.getBeach(id).subscribe({
      next: (data) => {
        this.beach = data;
        this.beach.imageUrl = `assets/image_beach/${data.id}.jpeg`;
        console.log('Beach', data);
      },
      error: (error) => {
        console.error('Error fetching beach: ', error);
      },
    });
  }
  openMaps(): void {
    if (this.beach && this.beach.latitude && this.beach.longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${this.beach.latitude},${this.beach.longitude}`;
      window.open(url, '_blank');
    } else {
      console.error('No coordinates available for this beach.');
    }
  }
}
