import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FishService {
  private apiUrl = 'http://localhost:8081/api/fish';
  private http = inject(HttpClient);

  constructor() {}

  getFishes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getFish(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createFish(fish: any): Observable<any> {
    return this.http.post(this.apiUrl, fish);
  }

  updateFish(fish: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, fish);
  }

  deleteFish(fish: { deleteId: String }): Observable<any> {
    return this.http.delete(`${this.apiUrl}`, { body: fish });
  }
  addBeachToFish(fishId: number, beachId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${fishId}/fish/${beachId}`, {});
  }
}
