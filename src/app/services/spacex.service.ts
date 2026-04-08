import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Launch } from '../models/launch.model';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  private readonly baseUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private readonly http: HttpClient) {}

  getLaunches(year?: string): Observable<Launch[]> {
    const url = year ? `${this.baseUrl}?launch_year=${encodeURIComponent(year)}` : this.baseUrl;
    return this.http.get<Launch[]>(url);
  }

  getLaunchById(id: string | number): Observable<Launch> {
    return this.http.get<Launch>(`${this.baseUrl}/${id}`);
  }

  getLaunchYears(): Observable<string[]> {
    return this.http.get<Launch[]>(this.baseUrl).pipe(
      map((launches) => [...new Set(launches.map((launch) => launch.launch_year))].sort())
    );
  }
}
