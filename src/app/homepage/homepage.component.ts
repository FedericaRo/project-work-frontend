import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SingleTaskComponent } from "../single-task/single-task.component";
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';
import { Task } from '../model/Task';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [DashboardComponent, SingleTaskComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

  constructor(public authService:AuthService, private taskService:TaskService){}

  tasks:Task[] = [];
  
  ngOnInit(): void {
    this.taskService.getAll().subscribe(data => {
    this.tasks = data});
  }

  // updateTaskFather() 
  // {
  //   this.taskService.update();
  // }
}
