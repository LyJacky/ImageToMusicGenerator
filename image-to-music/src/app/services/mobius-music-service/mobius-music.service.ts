import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MobiusMusicService {

  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  // Example method to make a GET request
  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
  }

  // Example method to make a POST request
  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/data`, data);
  }
}
