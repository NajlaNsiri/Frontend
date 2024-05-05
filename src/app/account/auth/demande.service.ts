import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from 'src/app/core/models/demande.model';
@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  baseUrl: string = "http://localhost:4000/api/demandes";

  constructor(private http: HttpClient) { }
  private getAuthHeaders() {
    const token = localStorage.getItem('token');  // Retrieve the token from localStorage
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }
  // Get all demandes
  getDemandes(): Observable<any> {
    return this.http.get(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }
  getDemandesByUserId(): Observable<any> {
    const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage
    if (!userId) {
      throw new Error('User ID not found'); // Optionally handle the absence of userId
    }
    return this.http.get(`${this.baseUrl}/user/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }
  

  // Get a single demande by id
  getDemande(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Create a new demande

  createDemande(demande: Demande): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage if authentication is needed
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.baseUrl, demande, { headers });
  }

  // Update an existing demande
  updateDemande(id: number, demande: Demande): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, demande, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete a demande
  deleteDemande(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
