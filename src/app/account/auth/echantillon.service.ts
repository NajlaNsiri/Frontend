import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Echantillon } from 'src/app/core/models/echantillon.model';
@Injectable({
  providedIn: 'root'
})
export class EchantillonService {
  baseUrl: string = "http://localhost:4000/api/echantillons";

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  getEchantillonsByDemandeId(demandeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/by-demande/${demandeId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError((error) => {
        console.error('Error fetching echantillons by demandeId', error);
        return throwError(error); // Properly handle the error and return an observable
      })
    );
  }
  // Get all echantillons
  getEchantillons(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Get a single echantillon by id
  getEchantillon(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getParametersByEchantillonId(echantillonId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${echantillonId}/parameters`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError((error) => {
        console.error('Error fetching parameters by echantillonId', error);
        return throwError(error);
      })
    );
  }
  // Create a new echantillon
  createEchantillon(demandeId: number, echantillon: Echantillon[]): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/All/${demandeId}`, echantillon,{ headers });
  }

  // Update an existing echantillon
  updateEchantillon(id: number, echantillon: Echantillon): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, echantillon);
  }

  // Delete an echantillon
  deleteEchantillon(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
