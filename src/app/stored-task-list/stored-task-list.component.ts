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


  
  
}
