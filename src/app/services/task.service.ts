import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/Product';
import { Task } from '../model/Task';
import { completionTask } from '../model/completionTask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = '/api/tasks';
  
  constructor(private http:HttpClient) { 
  }

  getAll():Observable<Task[]>
  {
    return this.http.get<Task[]>("/api/tasks");
  }

  update(id:number, ct:completionTask):Observable<Task>
  {
    console.log(ct);
    return this.http.put<Task>(`${this.apiUrl}/${id}`, ct);
  }

  

}
