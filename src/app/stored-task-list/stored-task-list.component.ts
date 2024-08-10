import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StoredtaskService } from '../services/storedtask.service';
import { StoredTask } from '../model/StoredTask';
import { StoredTaskComponent } from '../stored-task/stored-task.component';

@Component({
  selector: 'app-stored-task-list',
  standalone: true,
  imports: [StoredTaskComponent],
  templateUrl: './stored-task-list.component.html',
  styleUrl: './stored-task-list.component.css'
})
export class StoredTaskListComponent {


  
  
}
