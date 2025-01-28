import { Component, Inject, Input, OnInit } from '@angular/core';
import { BeachService } from '../../core/services/beach.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  @Input() beachId: number | undefined;
  weather: any = null;
  loading: boolean = true;

  constructor(@Inject(BeachService) private beachService: BeachService) {}

  ngOnInit(): void {
    if (this.beachId) {
      this.getWeather(this.beachId);
    }
  }

  getWeather(beachId: number): void {
    this.beachService.getWeatherForBeach(beachId).subscribe(
      (data) => {
        this.weather = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching weather data:', error);
        this.loading = false;
      }
    );
  }
}
