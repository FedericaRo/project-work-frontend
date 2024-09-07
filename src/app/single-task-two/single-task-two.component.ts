import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { completionTask } from '../model/completionTask';
import { Task } from '../model/Task';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-single-task-two',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTooltipModule],
  templateUrl: './single-task-two.component.html',
  styleUrl: './single-task-two.component.css'
})
export class SingleTaskTwoComponent implements OnInit, OnChanges{
     
  constructor(public authService:AuthService, private taskService:TaskService, private http:HttpClient, private loadingService: LoadingService,){}

  tasks:Task[]=[];
  tasksbackup:Task[]=[];
  filterCriteria:string = ' ';
  userRole:string=this.authService.getUserRole()!;
  
  ngOnInit(): void {
    this.completed=this.task.status==='COMPLETATO' ? true : false;
  }

  ngOnChanges(changes: SimpleChanges): void {
      
  }
  
  completed:boolean=false;
  
  @Input() task!:Task;
  @Output() taskUpdated = new EventEmitter<Task>();
}
    
     
    


