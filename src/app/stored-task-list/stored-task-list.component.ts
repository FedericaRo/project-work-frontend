import { Component } from '@angular/core';
import { SingleTaskComponent } from "../single-task/single-task.component";
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';
import { Task } from '../model/StoredTask';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stored-task-list',
  standalone: true,
  imports: [SingleTaskComponent, CommonModule, FormsModule],
  templateUrl: './stored-task-list.component.html',
  styleUrl: './stored-task-list.component.css'
})
export class StoredTaskListComponent {


    
  constructor(public authService:AuthService, private taskService:TaskService){}


  filterCriteria:string = '';
  tasks:Task[] = [];
  oldTasks: Task[] = [];
  backupOldTasks: Task[]=[];

  ngOnInit(): void 
  {
  this.loadOldTasks()
  }

  loadOldTasks() {
    const twoMonthsAgo = new Date();

    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    twoMonthsAgo.setHours(0,0,0);

    this.taskService.getAll().subscribe(data => {
      this.oldTasks = data.filter(task => {
        const creationDate = new Date(task.creationDate);
        
        return task.frequency !== 'SETTIMANALE' || 'BISETTIMANALE' && creationDate < twoMonthsAgo;
      });
      this.backupOldTasks = [...this.oldTasks];
    });


  }

  
  
}
