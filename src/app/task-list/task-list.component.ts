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

  filterCriteria:string = ' ';

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

    // if (task.name.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
    //   this.filteredTasks = this.tasksbackup.filter(t => t.name.toLowerCase().includes(this.filterCriteria.toLowerCase()));
    // } else if (task.frequency.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
    //   this.filteredTasks = this.tasksbackup.filter(t => t.frequency.toLowerCase().includes(this.filterCriteria.toLowerCase()));
    // } else if (task.status.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
    //   this.filteredTasks = this.tasksbackup.filter(t => t.status.toLowerCase().includes(this.filterCriteria.toLowerCase()));
    // } else if (task.creationDate.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
    //   this.filteredTasks = this.tasksbackup.filter(t => t.creationDate.toLowerCase().includes(this.filterCriteria.toLowerCase()));
    // } else if (task.description.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
    //   this.filteredTasks = this.tasksbackup.filter(t => t.description.toLowerCase().includes(this.filterCriteria.toLowerCase()));
    // } else if (task.signature.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
    //   this.filteredTasks = this.tasksbackup .filter(t => t.signature.toLowerCase().includes(this.filterCriteria.toLowerCase()));
    // }
    
    return this.tasksbackup.filter(
      t => 
        t.name.toLowerCase().includes(this.filterCriteria.toLowerCase())          ||
        t.frequency.toLowerCase().includes(this.filterCriteria.toLowerCase())     ||
        t.status.toLowerCase().includes(this.filterCriteria.toLowerCase())        ||
        t.creationDate.toLowerCase().includes(this.filterCriteria.toLowerCase())  ||
        t.description.toLowerCase().includes(this.filterCriteria.toLowerCase())   ||
        t.signature.toLowerCase().includes(this.filterCriteria.toLowerCase())

    );
  }  

}
