import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeachService {
  private apiUrl = 'http://localhost:8081/api/beaches';
  private http = inject(HttpClient);

  constructor() {}

  getBeaches(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getBeach(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createBeach(beach: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, beach);
  }

  updateBeach(id: number, beach: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${beach.id}`, beach);
  }

  deleteBeach(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addFishToBeach(beachId: number, fishId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${beachId}/fish/${fishId}`, {});
  }
}
