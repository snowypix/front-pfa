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
  filePaths: File[];
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
  getbyId(id: string | null) {
    // Get the token from wherever you have stored it (e.g., local storage, a service, etc.)
    const token = localStorage.getItem('token'); // Replace with your actual token

    // Add the token to the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get("http://localhost:8000/api/activity/" + id, { headers })
  }
  // Update the create methodhttp://localhost:8000/api/activities
  create(formData: FormData) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('enctype', 'multipart/form-data');
    return this.http.post(this.url + '/create', formData, { headers });
  }
  createWork(formData: FormData, id: string | null) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('enctype', 'multipart/form-data');
    return this.http.post(`http://localhost:8000/api/submitWorkFiles/${id}`, formData, { headers });
  }
  checkWork(id: string | null) {
    // Get the token from wherever you have stored it (e.g., local storage, a service, etc.)
    const token = localStorage.getItem('token'); // Replace with your actual token

    // Add the token to the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>("http://localhost:8000/api/submitstatus/" + id, { headers })

  }
  Seen(id: number) {
    // Get the token from wherever you have stored it (e.g., local storage, a service, etc.)
    const token = localStorage.getItem('token'); // Replace with your actual token

    // Add the token to the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send the PATCH request with headers
    return this.http.patch<any>(`http://localhost:8000/api/seen/${id}`, {}, { headers });
  }
  SeenOnce(id: string | null) {
    // Get the token from wherever you have stored it (e.g., local storage, a service, etc.)
    const token = localStorage.getItem('token'); // Replace with your actual token

    // Add the token to the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send the PATCH request with headers
    return this.http.patch<any>(`http://localhost:8000/api/seenOnce/${id}`, {}, { headers });
  }
}
