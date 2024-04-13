import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Activity interface
interface Activity {
  intitule: string;
  type: string;
  matiere: string;
  dateRemise: string;
  created_at: string;
  class: string;
  group: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  url = "http://localhost:8000/api/activities"
  constructor(private http: HttpClient) { }
  getAll() {
    // Get the token from wherever you have stored it (e.g., local storage, a service, etc.)
    const token = localStorage.getItem('token'); // Replace with your actual token

    // Add the token to the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.url, { headers })
  }
  // Update the create method
  create(data: Activity) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.post(this.url + '/create', data, { headers });
  }
}
