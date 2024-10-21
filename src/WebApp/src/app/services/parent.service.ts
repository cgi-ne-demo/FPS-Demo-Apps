import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parent } from '../models/parent';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  private apiUrl  =  environment['PARENT_API_BASE_URL'];
  
  constructor(private http: HttpClient) { }

  getAllParentsForFamily(id:number): Observable<Parent[]> {
    return this.http.get<Parent[]>(`${this.apiUrl}/forFamily/${id}`);
  }

  getParentById(id: number): Observable<Parent> {
    return this.http.get<Parent>(`${this.apiUrl}/${id}`);
  }

  createParent(Parent: Parent): Observable<Parent> {
    console.log("api url: " + this.apiUrl);
    return this.http.post<Parent>(this.apiUrl, Parent);
  }

  updateParent(Parent: Parent): Observable<Parent> {
    return this.http.put<Parent>(`${this.apiUrl}/${Parent.parentId}`, Parent);
  }

  deleteParent(id: number): Observable<Parent> {
    return this.http.delete<Parent>(`${this.apiUrl}/${id}`);
  }

}
