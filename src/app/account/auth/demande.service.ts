import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from 'src/app/core/models/demande.model';
@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  baseUrl: string = "http://localhost:4000/api/demandes";

  constructor(private http: HttpClient) { }

  // Get all demandes
  getDemandes(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Get a single demande by id
  getDemande(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Create a new demande
  createDemande(demande: Demande): Observable<any> {
    return this.http.post(this.baseUrl, demande);
  }

  // Update an existing demande
  updateDemande(id: number, demande: Demande): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, demande);
  }

  // Delete a demande
  deleteDemande(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
