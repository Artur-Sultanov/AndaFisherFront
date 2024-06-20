import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BeachService } from '../../../services/beach.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beach-list',
  standalone: true,
  templateUrl: './beach-list.component.html',
  styleUrl: './beach-list.component.css',
  imports: [CommonModule, FormsModule, RouterModule],
})
export class BeachListComponent implements OnInit {
  beaches: any[] = [];
  id: string | null = null;

  constructor(private beachService: BeachService) {}

  ngOnInit(): void {
    this.loadBeaches();
  }

  loadBeaches(): void {
    this.beachService.getBeaches().subscribe({
      next: (data) => {
        console.log('data', data);

        this.beaches = data;
        console.log('Beaches: ', this.beaches);
      },
      error: (error) => {
        console.error('Error fetching beaches: ', error);
      },
    });
  }
}
