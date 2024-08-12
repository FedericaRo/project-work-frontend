import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SingleTaskComponent } from "../single-task/single-task.component";
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';
import { Task } from '../model/Task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FilteredCommunicationCardComponent } from "../filtered-communication-card/filtered-communication-card.component";
import { Communication } from '../model/Communication';
import { CommunicationsService } from '../services/communications.service';
import { OrdersService } from '../services/orders.service';
import { Order } from '../model/Order';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [DashboardComponent, MatDividerModule ,SingleTaskComponent, CommonModule, FormsModule, MatIconModule, MatButtonModule, FilteredCommunicationCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{


  constructor(public authService:AuthService, 
              private taskService:TaskService,
              private communicationService:CommunicationsService, 
              private orderService:OrdersService){}

  communications:Communication[] =  [];
  filteredCommunications:Communication[] = []; 

  filterCriteria:string = '';
  fontIconName:string= 'arrow_drop_up';

  tasks: Task[] = [];
  
  weeklyTask: Task[] = [];
  biWeeklyTask: Task[] = [];
  monthlyTask: Task[] = []; // Modifica il tipo se necessario
  
  unitedTask: Task[] = []; //Task listate nell'effettivo
  backupTasks: Task[] = [];

  completedTask: Task[] = [];
  notCompletedTask: Task[] = [];
  notArrivedOrders: Order[] = [];
  newCommunications: Communication[] = [];

  statux:string='';
  freq:string='';


  counter:number = 0;
  counter2:number = 0;

  ngOnInit(): void {
    this.loadTasks();
    this.loadCommunications();
    this.orderService.getAll().subscribe(data => {
      this.notArrivedOrders = data.filter(o => o.arrived === false);
    })
    // this.backupTasks = this.unitedTask;
  }

  loadCommunications(): void {
    this.communicationService.getAll().subscribe(data => {
      this.communications = data;
      this.filterCommunications();
      this.newCom();
    });
        

  }

  filterCommunications(): void {
    this.filteredCommunications = this.communications.reverse().filter(c => 
      c.type === 'CAMBIO TURNO' || c.importance === 'ALTA'
    );
  }


  newCom(): void{
    let dataDiOggi = new Date();
    this.newCommunications = this.communications.filter(c => {
      const creationDate = this.parseDate(c.creationDate);

      // Calcolare la differenza in millisecondi
      const diffInMs = dataDiOggi.getTime() - creationDate.getTime();

      // Se la differenza è minore o uguale a 86.400.000 ms (24 ore), considerare la comunicazione valida
      return diffInMs <= 86400000;
    });

    console.log(this.newCommunications)
    console.log(this.communications[0].communicationName, this.communications[0].creationDate)
    console.log(this.communications)
    
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
    this.completedTask = this.weeklyTask.concat(this.biWeeklyTask, this.monthlyTask)
    .filter(t => t.status === "COMPLETATO");
    this.notCompletedTask = this.weeklyTask.concat(this.biWeeklyTask, this.monthlyTask)
    .filter(t => t.status === "DAFARSI");
    this.backupTasks =this.weeklyTask.concat(this.biWeeklyTask, this.monthlyTask);
    console.log('United Task:', this.unitedTask);
  }

  onTaskUpdated(updatedTask: any): void {
    // Find the updated task in the local array and update it
    const index = this.unitedTask.findIndex(task => task.id === updatedTask.id);
    if (index > -1) {
      this.unitedTask[index] = updatedTask;
    }

    const index2 = this.backupTasks.findIndex(task => task.id === updatedTask.id);
    if (index > -1) {
      this.backupTasks[index2] = updatedTask;
    }

    this.completedTask = this.unitedTask.filter(t => t.status === "COMPLETATO");
    this.notCompletedTask = this.unitedTask.filter(t => t.status === "DAFARSI");
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


  filterTaskByProperties():void
  {
    
      this.unitedTask = this.backupTasks;
      
      for(let task of this.unitedTask)
        {
          if(task.name.toLowerCase().includes(this.filterCriteria.toLowerCase()))
            this.unitedTask = this.unitedTask.filter(p => p.name.toLowerCase().includes(this.filterCriteria.toLowerCase()));
          // else if(task.frequency.toLowerCase().includes(this.filterCriteria.toLowerCase()))
          //   this.unitedTask = this.unitedTask.filter(p => p.frequency.toLowerCase().includes(this.filterCriteria.toLowerCase()));
          // else if(task.status.toLowerCase().includes(this.filterCriteria.toLowerCase()))
          //   this.unitedTask = this.unitedTask.filter(p => p.status.toLowerCase().includes(this.filterCriteria.toLowerCase()));
          // else if(task.signature.toLowerCase().includes(this.filterCriteria.toLowerCase()))
          //   this.unitedTask = this.unitedTask.filter(p => p.signature.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        }
  }

  sortByStatus():Task[]
  {

    this.counter++;
    let valore = this.counter % 2;

    const statusOrder: { [key: string]: number } = {
      'COMPLETATO': 1,
      'DAFARSI': 2,
      // '': 3
    };

      if (valore == 0)
      {
        this.statux = 'Completate';
        return this.unitedTask = [...this.backupTasks].sort((a, b) => {
          return statusOrder[a.status] - statusOrder[b.status];
        });
      }
      if (valore == 1)
      {
        this.statux = 'Da farsi';
        return this.unitedTask = [...this.backupTasks].sort((a, b) => {
          return statusOrder[b.status] - statusOrder[a.status];
        });
      }
      // if (valore == 2)
      // {
      //   return this.unitedTask = this.backupTasks;
      // }
    'Non ordinate'
    return this.unitedTask;
  }


  sortByFrequency():Task[]
  {

    this.counter2++;
    let valore = this.counter2 % 3;

    const frequencyOrder: { [key: string]: number } = {
      'SETTIMANALE': 1,
      'BISETTIMANALE': 2,
      'MENSILE': 3
    };

      if (valore == 0)
      {
        this.freq = 'Settimanale';
        return this.unitedTask = [...this.backupTasks].sort((a, b) => {
          return frequencyOrder[a.frequency] - frequencyOrder[b.frequency];
        });
      }
      if (valore == 1)
      {
        this.freq = 'Mensile';
        return this.unitedTask = [...this.backupTasks].sort((a, b) => {
          return frequencyOrder[b.frequency] - frequencyOrder[a.frequency];
        });
      }
      if (valore == 2)
      {

        frequencyOrder['BISETTIMANALE'] = 1;
        frequencyOrder['SETTIMANALE'] = 2;
        frequencyOrder['MENSILE'] = 3;

        this.freq = 'Bisettimanale';
        return this.unitedTask = [...this.backupTasks].sort((a, b) => {
          return frequencyOrder[a.frequency] - frequencyOrder[b.frequency];
        });
      }
      
    'Non ordinate'
    return this.unitedTask;
  }

  }

  // updateTaskFather() 
  // {
  //   this.taskService.update();
  // }

  // si devono vedere le task degli ultimi due mesi senza le task che stanno nella homepage, quando scadono vanno in quella