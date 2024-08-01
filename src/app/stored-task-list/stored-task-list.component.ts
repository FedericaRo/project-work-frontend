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
export class StoredTaskListComponent implements OnInit
{
  constructor(public authService:AuthService, private StoredTaskService:StoredtaskService){}

  storedtasks:StoredTask[] = [];
  
  ngOnInit(): void 
  {
    this.loadstoredTasks();
  }

  loadstoredTasks(): void {
      this.StoredTaskService.getAll().subscribe(data => {
      this.storedtasks = data;
    });
  }

  onstoredTaskUpdated(updatedstoredTask: any): void {

    const index = this.storedtasks.findIndex(storedtask => storedtask.id === updatedstoredTask.id);
    if (index > -1) {
      this.storedtasks[index] = updatedstoredTask;
    }
  }

  deleteStoredTask(id: number): void 
  {
    this.StoredTaskService.delete(id).subscribe(() => {
      this.storedtasks = this.storedtasks.filter(c => c.id !== id);
    }, error => {
      console.error("ERROREEEEE, non si può", error);
    });
  }
}
