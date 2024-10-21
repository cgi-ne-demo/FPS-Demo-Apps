import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Family } from '../models/family';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  private apiUrl  =  environment['FAMILY_API_BASE_URL'];

  constructor(private http: HttpClient) { }

  getAllFamilies(): Observable<Family[]> {
    return this.http.get<Family[]>(this.apiUrl);
  }

  getFamilyById(id: number): Observable<Family> {
    return this.http.get<Family>(`${this.apiUrl}/${id}`);
  }

  getCompleteFamilyById(id: number): Observable<Family> {
    return this.http.get<Family>(`${this.apiUrl}/${id}/all`);
  }

  createFamily(family: Family): Observable<Family> {
    return this.http.post<Family>(this.apiUrl, family);
  }

  updateFamily(family: Family): Observable<Family> {
    return this.http.put<Family>(`${this.apiUrl}/${family.familyId}`, family);
  }

  deleteFamily(id: number): Observable<Family> {
    return this.http.delete<Family>(`${this.apiUrl}/${id}`);
  }

}
