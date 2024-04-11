import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http://localhost:8000/api/login"
  constructor(private http: HttpClient) { }
  login(data: { email: string, password: string }) {
    return this.http.post(this.url, data)
  }
}
