import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parameter } from 'src/app/core/models/parameter.model';
@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  baseUrl: string = "http://localhost:4000/api/parameters";

  constructor(private http: HttpClient) { }

  // Get all parameters
  getParameters(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/available`,{ headers });
  }

  // Get a single parameter by id
  getParameterById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

}
