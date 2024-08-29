import { Component, OnInit } from '@angular/core';
import { StoredtaskService } from '../services/storedtask.service';
import { StoredTask } from '../model/StoredTask';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoredTaskComponent } from '../stored-task/stored-task.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-stored-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, StoredTaskComponent, MatIconModule, MatButtonModule, MatTooltipModule, MatFormFieldModule, MatOptionModule,FormsModule,ReactiveFormsModule,MatButtonToggleModule, MatRadioModule, MatInputModule,MatSelectModule, MatFormFieldModule ],
  templateUrl: './stored-task-list.component.html',
  styleUrls: ['./stored-task-list.component.css']
})
export class StoredTaskListComponent implements OnInit {
  storedTasks: StoredTask[] = [];
  newStoredTask: StoredTask = { id: 0, name: '', description: '', frequency: '' };
  isEditing: boolean = false;
  showModal: boolean = false;

  constructor(private storedTaskService: StoredtaskService) {}

  ngOnInit(): void {
    this.loadStoredTasks();
  }

  loadStoredTasks(): void {
    this.storedTaskService.getAll().subscribe(storedTask => {
      this.storedTasks = storedTask.reverse();
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  // resetForm(): void {
  //   this.newStoredTask = { id: 0, name: '', description: '', frequency: '' };
  //   this.isEditing = false;
  // }

  addStoredTask(): void {
    this.storedTaskService.addNewStoredTask(this.newStoredTask).subscribe(storedTask => {
      this.storedTasks.unshift(storedTask);
      this.toggleModal();
    });
  }

  updateStoredTask(updatedTask: any): void {
    const index = this.storedTasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.storedTasks[index] = { ...updatedTask }; // Aggiorna la task nella lista
    }
  }
  

  deleteStoredTask(id: number): void {
    this.storedTaskService.delete(id).subscribe(() => {
      this.storedTasks = this.storedTasks.filter(task => task.id !== id);
    });
  }

  onTaskDelete(id: number | null): void {
    if (id !== null) {
      this.deleteStoredTask(id);
    }
  }

  onTaskUpdate(storedTask: StoredTask): void {
    this.storedTaskService.update(storedTask.id!, storedTask).subscribe(
      {
        next: data=> 
        {
          console.log(data);
        },
        error: badResponse=> 
        {
          console.log(badResponse);
        }
      }
    )
    
    this.newStoredTask = { ...storedTask };
    this.isEditing = true;
  }
}
