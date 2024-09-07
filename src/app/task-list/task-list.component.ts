import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../model/Task';
import { SingleTaskComponent } from "../single-task/single-task.component";
import { CommonModule } from '@angular/common';
import { SingleTaskTwoComponent } from '../single-task-two/single-task-two.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [SingleTaskComponent, CommonModule, SingleTaskTwoComponent,FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasksbackup:Task[]=[];

  filterCriteria:string = '';

  counter:number = 0;
  counter2:number = 0;

  statux:string='';
  freq:string='';

  unitedTask: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAll().subscribe(data => {
      this.tasksbackup = this.filterTasks(data);
    });
  }

  filterTasks(tasks: Task[]): Task[] {
    return tasks.filter(task => {
      if (task.status !== 'DAFARSI') {
        const creationDate = new Date(task.creationDate);
        if (task.frequency === 'SETTIMANALE') {
          return this.isOlderThanDays(creationDate, 7);
        } else if (task.frequency === 'BISETTIMANALE') {
          return this.isOlderThanDays(creationDate, 14);
        } else if (task.frequency === 'MENSILE') {
          return this.isOlderThanMonths(creationDate, 1);
        }
      }
      return false;
    });
  }

  isOlderThanDays(date1: Date, days: number): boolean {
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - date1.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays > days;
  }

  isOlderThanMonths(date1: Date, months: number): boolean {
    const currentDate = new Date();
    const yearsDifference = currentDate.getFullYear() - date1.getFullYear();
    const monthsDifference = currentDate.getMonth() - date1.getMonth() + (yearsDifference * 12);
    return monthsDifference > months;
  }



  filterSearchTask() : Task[] {

    return this.tasksbackup.filter(
      t => 
        // t.name.toLowerCase().includes(this.filterCriteria.toLowerCase())          ||
        t.name.toLowerCase().includes(this.filterCriteria.toLowerCase())             ||
        t.frequency.toLowerCase().includes(this.filterCriteria.toLowerCase())        ||
        t.status.toLowerCase().includes(this.filterCriteria.toLowerCase())           ||
        t.creationDate.toLowerCase().includes(this.filterCriteria.toLowerCase())     ||
        t.description.toLowerCase().includes(this.filterCriteria.toLowerCase())      ||
        t.signature.toLowerCase().includes(this.filterCriteria.toLowerCase())
    )                                                                                 ;
  }  


  sortByStatus(): void {
    this.counter++;
    let valore = this.counter % 2;
  
    const statusOrder: { [key: string]: number } = {
      'COMPLETATO': 1,
      'INCOMPIUTO': 2,
    };
  
    if (valore == 0) {
      this.statux = 'Completate';
      this.tasksbackup = [...this.tasksbackup].sort((a, b) => {
        return statusOrder[a.status] - statusOrder[b.status];
      });
    } else {
      this.statux = 'Incompiute';
      this.tasksbackup = [...this.tasksbackup].sort((a, b) => {
        return statusOrder[b.status] - statusOrder[a.status];
      });
    }
  }
  
  sortByFrequency(): void {
    this.counter2++;
    let valore = this.counter2 % 3;
  
    const frequencyOrder: { [key: string]: number } = {
      'SETTIMANALE': 1,
      'BISETTIMANALE': 2,
      'MENSILE': 3
    };
  
    if (valore == 0) {
      this.freq = 'Settimanale';
      this.tasksbackup = [...this.tasksbackup].sort((a, b) => {
        return frequencyOrder[a.frequency] - frequencyOrder[b.frequency];
      });
    } else if (valore == 1) {
      this.freq = 'Mensile';
      this.tasksbackup = [...this.tasksbackup].sort((a, b) => {
        return frequencyOrder[b.frequency] - frequencyOrder[a.frequency];
      });
    } else {
      frequencyOrder['BISETTIMANALE'] = 1;
      frequencyOrder['SETTIMANALE'] = 2;
      frequencyOrder['MENSILE'] = 3;
  
      this.freq = 'Bisettimanale';
      this.tasksbackup = [...this.tasksbackup].sort((a, b) => {
        return frequencyOrder[a.frequency] - frequencyOrder[b.frequency];
      });
    }
  }
}
