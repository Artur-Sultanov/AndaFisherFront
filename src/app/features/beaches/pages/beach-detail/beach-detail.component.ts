import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeachService } from '../../../../core/services/beach.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beach-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beach-detail.component.html',
  styleUrls: ['./beach-detail.component.css'],
})
export class BeachDetailComponent implements OnInit {
  beach: any = null;
  weather: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private beachService: BeachService
  ) {}

  ngOnInit(): void {
    const beachId = this.route.snapshot.params['id'];
    this.loadBeachDetails(beachId);
    this.loadWeatherDetails(beachId);
  }

  private loadBeachDetails(beachId: number): void {
    this.beachService.getBeachById(beachId).subscribe(
      (data) => {
        this.beach = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching beach details:', error);
        this.loading = false;
      }
    );
  }

  private loadWeatherDetails(beachId: number): void {
    this.beachService.getWeatherForBeach(beachId).subscribe(
      (data) => {
        this.weather = data;
      },
      (error) => {
        console.error('Error fetching weather details:', error);
      }
    );
  }
}
