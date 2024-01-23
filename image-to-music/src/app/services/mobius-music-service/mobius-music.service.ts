import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MobiusMusicService {
  // private root = "http://localhost:8080"
  private apiUrl = "http://localhost:8080";

  constructor(private http: HttpClient) {}

  // Example method to make a GET request
  getData(data:any): Observable<any> {
    console.log("i went inside of here:")
    console.log(`${this.apiUrl}/api/data`)
    console.log('FormData entries from the service:');
    const formData: FormData = new FormData();
    formData.append('image', data);
    console.log('FormData properties:', formData);
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    return this.http.post(`${this.apiUrl}/api/data`,formData);
  }

  // Example method to make a POST request
  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/data`, data);
  }
}
