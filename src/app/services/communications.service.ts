import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Communication } from '../model/Communication';

@Injectable({
  providedIn: 'root'
})
export class CommunicationsService {

  constructor(private http:HttpClient) { }


  getAll(): Observable<Communication[]>
  {
    return this.http.get<Communication[]>(`/api/communications`);
  }

  delete(id:number): Observable<void>
  {
    return this.http.delete<void>(`/api/communications/${id}`);
  }

  addNewCommunication(communication:Communication):Observable<Communication>
  {
    return this.http.post<Communication>(`/api/communications/newCommunication`, communication);
  }



}
