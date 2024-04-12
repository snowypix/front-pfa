import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  url = "http://localhost:8000/api/activities"
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(this.url)
  }
}
