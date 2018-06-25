import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Planet } from './planet';

@Injectable({
  providedIn: 'root'
})
export class DataFetcherService {

  initialPlanetUrl = 'http://localhost:8000/api/planets/2';
  randomPlanetUrl = 'http://localhost:8000/api/planets/random';

  constructor(private http: HttpClient) { }

  getFirstPlanet(): Observable<Planet> {
    return this.http.get<Planet>(this.initialPlanetUrl);
  }

  getRandomPlanet(): Observable<Planet> {
    return this.http.get<Planet>(this.randomPlanetUrl);
  }
}
