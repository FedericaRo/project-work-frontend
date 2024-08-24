import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from '../model/Task';
import { AuthService } from '../services/auth.service';
import { completionTask } from '../model/completionTask';
import { TaskService } from '../services/task.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../services/loading.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-single-task',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltip],
  templateUrl: './single-task.component.html',
  styleUrl: './single-task.component.css'
})
export class SingleTaskComponent implements OnInit, OnChanges{

  
  constructor(public authService:AuthService, private taskService:TaskService, private http:HttpClient, private loadingService: LoadingService){}

  taskACompletamento:completionTask={status:"", signature:""}
  userRole:string=this.authService.getUserRole()!;
  
  ngOnInit(): void {
    this.completed=this.task.status==='COMPLETATO' ? true : false;
    // this.userRole=this.authService.getUserRole()!;
    // this.isChecked=this.completed;
  }

  ngOnChanges(changes: SimpleChanges): void {
      
  }

  userName = localStorage.getItem("profilename")
  userSurname = localStorage.getItem("profilesurname")
  userId = localStorage.getItem('profileid')
  email = localStorage.getItem("username")
  
  completed:boolean=false;
  
  @Input() task!:Task;
  @Output() taskUpdated = new EventEmitter<Task>();


  switchStatus():void {
    if(this.task.status==="COMPLETATO")
    {
      this.taskACompletamento.status='DAFARSI';
      this.taskACompletamento.signature="";
    }
    else
    {
      this.taskACompletamento.status='COMPLETATO';
      this.taskACompletamento.signature=this.userName!;
    }
  }



  updateTaskSon() 
  {
    this.userName = localStorage.getItem("profilename");
      this.switchStatus();
      console.log(this.userRole);
    // this.toggleCheckbox();

      this.taskService.update(this.task.id!, this.taskACompletamento)
      .subscribe({
        next: (data) => {
          this.loadingService.show();
          this.taskUpdated.emit(data);
          console.log(this.userRole);
          // localStorage.setItem("profilename",profile.name);
          // this.userName = localStorage.getItem("profilename");
          // this.updateTask.emit();
          // this.taskACompletamento={status:"", signature:""};
        },
        error: (badResponse) => 
        {
          // Gestisci l'errore qui
          console.error('Update failed', badResponse);
        },
        complete: () => {
          setTimeout(() => {
            this.loadingService.hide();
          }, 0);
        }
    });
  }

}
