import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';
import { Task } from '../model/Task';
import { completionTask } from '../model/completionTask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Task[]>
  {
    return this.http.get<Task[]>("/api/tasks");
  }

  update(id:number, ct:completionTask):Observable<completionTask>
  {
    console.log(ct);
    return this.http.put<completionTask>(`/api/tasks/${id}`, ct);
  }

}
