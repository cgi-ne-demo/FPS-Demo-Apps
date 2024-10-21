import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Child } from '../models/child';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  private apiUrl  =  environment['CHILD_API_BASE_URL'];
  
  constructor(private http: HttpClient) { }

  getAllChildrenForFamily(id:number): Observable<Child[]> {
    return this.http.get<Child[]>(`${this.apiUrl}/forFamily/${id}`);
  }

  getChildById(id: number): Observable<Child> {
    return this.http.get<Child>(`${this.apiUrl}/${id}`);
  }

  createChild(Child: Child): Observable<Child> {
    return this.http.post<Child>(this.apiUrl, Child);
  }

  updateChild(Child: Child): Observable<Child> {
    return this.http.put<Child>(`${this.apiUrl}/${Child.childId}`, Child);
  }

  deleteChild(id: number): Observable<Child> {
    return this.http.delete<Child>(`${this.apiUrl}/${id}`);
  }
}
