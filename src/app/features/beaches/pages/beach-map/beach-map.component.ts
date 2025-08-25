import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { BeachService } from '../../../../core/services/beach.service';

// Решение для внешних иконок (чтобы не тянуть их из node_modules)
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

@Component({
  selector: 'app-beach-map',
  standalone: true,
  templateUrl: './beach-map.component.html',
  styleUrls: ['./beach-map.component.css'],
})
export class BeachMapComponent implements OnInit {
  private map: L.Map | undefined;

  constructor(private beachService: BeachService) {}

  ngOnInit(): void {
    this.initMap();
    this.loadBeaches();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [37.2, -3.4],
      zoom: 8,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  private loadBeaches(): void {
    this.beachService.getBeaches().subscribe((beaches) => {
      beaches.forEach((beach) => {
        if (this.map) {
          const marker = L.marker([beach.latitude, beach.longitude]).addTo(
            this.map
          );

          // Fetch weather data for each beach
          this.beachService
            .getWeatherForBeach(beach.id)
            .subscribe((weather) => {
              const popupContent = `
              <div style="display: flex; flex-direction: column; gap: 1rem;">
  <!-- Верхняя секция -->
  <div style="text-align: center;">
    <h2>${beach.name}</h3>
    <p>${beach.description}</p>
  </div>

  <!-- Нижняя секция -->
  <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
    <!-- Левая часть: картинка -->
    <div>
      ${
        beach.imagePath
          ? `<img src="http://localhost:8081/uploads/images/${beach.imagePath}" alt="${beach.name}" style="width: 200px; border-radius: 8px;" />`
          : '<p>No image available</p>'
      }
    </div>

    <!-- Правая часть: погода -->
    <div style="font-size: 0.9rem; color: #555;">
      <h4 style="margin: 0;">Weather:</h4>
      <p style="margin: 0;">${weather.description}, ${weather.temperature}°C</p>
      <p style="margin: 0;">Feels like: ${weather.feelsLike}°C</p>
      <p style="margin: 0;">Wind: ${weather.windSpeed} m/s</p>
      <p style="margin: 0;">Humidity: ${weather.humidity}%</p>
      <img src="${
        weather.iconUrl
      }" alt="Weather icon" style="margin-top: 0.5rem;" />
    </div>
  </div>
</div>

            `;
              marker.bindPopup(popupContent);
            });
        }
      });
    });
  }
}
