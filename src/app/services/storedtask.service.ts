import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoredTask } from '../model/StoredTask';

@Injectable({
  providedIn: 'root'
})
export class StoredtaskService {
  private apiUrl = 'api/storedTasks';
  private newStoredTaskUrl = 'api/storedTasks/newStoredTask';

  constructor(private http: HttpClient) {}

  getAll(): Observable<StoredTask[]> {
    return this.http.get<StoredTask[]>(this.apiUrl);
  }

  addNewStoredTask(storedTask: StoredTask): Observable<StoredTask> {
    return this.http.post<StoredTask>(this.newStoredTaskUrl, storedTask);
  }

  update(id: number, storedTask: StoredTask): Observable<StoredTask> {
    return this.http.put<StoredTask>(`${this.apiUrl}/${id}`, storedTask);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}