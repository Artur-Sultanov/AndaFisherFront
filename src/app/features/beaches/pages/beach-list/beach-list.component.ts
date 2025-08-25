import { Component, OnInit } from '@angular/core';
import { BeachService } from '../../../../core/services/beach.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-beach-list',
  standalone: true,
  templateUrl: './beach-list.component.html',
  styleUrls: ['./beach-list.component.css'],
  imports: [CommonModule, RouterModule],
  providers: [BeachService],
})
export class BeachListComponent implements OnInit {
  beaches: any[] = [];
  loading = true;
  imageBaseUrl = 'http://localhost:8081/uploads/images/';

  constructor(private beachService: BeachService) {}

  ngOnInit(): void {
    this.beachService.getBeaches().subscribe(
      (data) => {
        this.beaches = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching beaches:', error);
        this.loading = false;
      }
    );
  }
}
