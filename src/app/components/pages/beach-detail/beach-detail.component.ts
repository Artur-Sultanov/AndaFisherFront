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
        console.log('Beach', data);
      },
      error: (error) => {
        console.error('Error fetching beach: ', error);
      },
    });
  }
}
