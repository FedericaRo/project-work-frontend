import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoredTask } from '../model/StoredTask';

@Injectable({
  providedIn: 'root'
})
export class StoredtaskService 
{

  constructor(private http:HttpClient) { }
  
  getAll(): Observable<StoredTask[]>
  {
    return this.http.get<StoredTask[]>("/api/storedtask");
  }

  delete(id:number): Observable<void>
  {
    return this.http.delete<void>(`/api/storedtask/${id}`)
  }

  addNewStoredTask(storedtask:StoredTask):Observable<StoredTask>
  {
    return this.http.post<StoredTask>(`/api/storedtask/newstoredtask`, storedtask)
  }
}
