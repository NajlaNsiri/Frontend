import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get(this.baseUrl);
  }

  // Get a single parameter by id
  getParameter(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Create a new parameter
  createParameter(parameter: Parameter): Observable<any> {
    return this.http.post(this.baseUrl, parameter);
  }

  // Update an existing parameter
  updateParameter(id: number, parameter: Parameter): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, parameter);
  }

  // Delete a parameter
  deleteParameter(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
