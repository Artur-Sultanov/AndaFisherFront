import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeachService {
  private apiUrl = 'http://localhost:8081/api/beaches';

  constructor(private http: HttpClient) {}

  getBeaches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getBeachById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBeach(beach: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, beach);
  }

  updateBeach(id: number, beach: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, beach);
  }

  deleteBeach(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getBeachImageUrl(imagePath: string): string {
    return `http://localhost:8081/uploads/images/beaches/${imagePath}`;
  }

  getBeachesForMap(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8081/api/beaches/map');
  }

  getWeatherForBeach(beachId: number): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8081/api/beaches/${beachId}/weather`
    );
  }
}
