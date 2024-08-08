import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { completionTask } from '../model/completionTask';
import { Task } from '../model/Task';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-task-two',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    // this.userRole=this.authService.getUserRole()!;
    // this.isChecked=this.completed;
  }

  ngOnChanges(changes: SimpleChanges): void {
      
  }
  
  completed:boolean=false;
  
  @Input() task!:Task;
  @Output() taskUpdated = new EventEmitter<Task>();
  
  filterTask() : void {
    this.tasks = this.tasksbackup;
  
    for (let task of this.tasks) 
      {
        if (task.name.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
          this.tasks = this.tasks.filter(t => t.name.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        } else if (task.frequency.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
          this.tasks = this.tasks.filter(t => t.frequency.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        } else if (task.status.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
          this.tasks = this.tasks.filter(t => t.status.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        } else if (task.creationDate.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
          this.tasks = this.tasks.filter(t => t.creationDate.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        } else if (task.description.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
          this.tasks = this.tasks.filter(t => t.description.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        } else if (task.completionDate.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
          this.tasks = this.tasks.filter(t => t.completionDate.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        } else if (task.signature.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
          this.tasks = this.tasks.filter(t => t.signature.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        }
    }
  }  

}
    
     
    


