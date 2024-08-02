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
  
  weeklyTask:Task[] = [];
  biWeeklyTask:Task[] = [];
  monthlyTask: Task[] = []; // Modifica il tipo se necessario
  
  unitedTask:Task[] = [];
  

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    //   this.taskService.getAll().subscribe(data => {
    //   this.tasks = data;
    // });
    
    this.loadBiweeklyTask();
    this.loadMonthlyTask();
    this.loadWeeklyTask();
    // this.unitedTask = this.weeklyTask.concat(this.biWeeklyTask,this.monthlyTask);
    
  }

  updateUnitedTask(): void {
    // Unisce gli array solo dopo che tutti i dati sono stati caricati
    this.unitedTask = this.weeklyTask.concat(this.biWeeklyTask, this.monthlyTask);
    console.log('United Task:', this.unitedTask); // Debug
  }

  onTaskUpdated(updatedTask: any): void {
    // Find the updated task in the local array and update it
    const index = this.unitedTask.findIndex(task => task.id === updatedTask.id);
    if (index > -1) {
      this.unitedTask[index] = updatedTask;
    }
  }


  parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  loadWeeklyTask(): void {
    let dataDiOggi = new Date();
    dataDiOggi.setHours(0, 0, 0, 0); // Ignora l'orario per un confronto più preciso

    this.taskService.getAll().subscribe(data => {
      this.weeklyTask = data
        .filter(t => t.frequency === "SETTIMANALE")
        .filter(t => {
          const creationDate = this.parseDate(t.creationDate);
          const diffInMs = dataDiOggi.getTime() - creationDate.getTime();
          const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
          return diffInDays <= 7;
        });
        this.updateUnitedTask();
    });
  }


  loadBiweeklyTask(): void {
    let dataDiOggi = new Date();
    dataDiOggi.setHours(0, 0, 0, 0); // Ignora l'orario per un confronto più preciso

    this.taskService.getAll().subscribe(data => {
      this.biWeeklyTask = data
        .filter(t => t.frequency === "BISETTIMANALE")
        .filter(t => {
          const creationDate = this.parseDate(t.creationDate);
          const diffInMs = dataDiOggi.getTime() - creationDate.getTime();
          const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
          return diffInDays <= 14;
        });
        this.updateUnitedTask();
    });
  }


  // Calcola la differenza in mesi tra due date
  getMonthsDifference(date1: Date, date2: Date): number {
    let months;
    months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();
    return months <= 0 ? 0 : months;
  }

  loadMonthlyTask(): void {
    let dataDiOggi = new Date();
    dataDiOggi.setHours(0, 0, 0, 0); // Ignora l'orario per un confronto più preciso

    this.taskService.getAll().subscribe(data => {
      this.monthlyTask = data
        .filter(t => t.frequency === "MENSILE")
        .filter(t => {
          const creationDate = this.parseDate(t.creationDate);
          const monthsDifference = this.getMonthsDifference(creationDate, dataDiOggi);
          return monthsDifference <= 1; // Filtra per attività create nell'ultimo mese
        });
        this.updateUnitedTask();
    });
  }

  // updateTaskFather() 
  // {
  //   this.taskService.update();
  // }
}
