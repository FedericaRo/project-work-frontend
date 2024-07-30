import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../model/Task';
import { AuthService } from '../services/auth.service';
import { completionTask } from '../model/completionTask';
import { TaskService } from '../services/task.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-single-task',
  standalone: true,
  imports: [],
  templateUrl: './single-task.component.html',
  styleUrl: './single-task.component.css'
})
export class SingleTaskComponent implements OnInit{

  
  constructor(public authService:AuthService, private taskService:TaskService, private http:HttpClient){
    
  }
  
  taskACompletamento:completionTask={status:"", signature:""}
  userRole:string="";
  
  ngOnInit(): void {
    this.completed=this.task.status==='COMPLETATO' ? true : false;
    this.userRole=this.authService.getUserRole()!;
    // this.isChecked=this.completed;
  }
  
  completed:boolean=false;
  
  @Input() task!:Task;
  
  isChecked:boolean=false;

  // toggleCheckbox() {
  //   this.isChecked = !this.isChecked;
  // }

  // switchStatus0():void {
  //   if(this.isChecked = true)
  //   {
  //     this.taskACompletamento.status='COMPLETATO';
  //     this.taskACompletamento.signature=this.userRole;
  //     console.log(this.userRole);
  //     console.log(this.taskACompletamento.signature);
  //   }
  //   else if(this.isChecked = false)
  //   {
  //     this.taskACompletamento.status='DAFARSI';
  //     this.taskACompletamento.signature!="";
  //     console.log(this.userRole);
  //     console.log(this.taskACompletamento.signature);
  //   }
  // }

  switchStatus():void {
    if(this.task.status==="COMPLETATO")
    {
      this.taskACompletamento.status='DAFARSI';
      this.taskACompletamento.signature!="";
    }
    else
    {
      this.taskACompletamento.status='COMPLETATO';
      this.taskACompletamento.signature!=this.userRole;
    }
  }



  updateTaskSon() 
  {
      this.switchStatus();

    // this.toggleCheckbox();

      this.taskService.update(this.task.id!, this.taskACompletamento)
      .subscribe({
        next: () => {
          // this.updateTask.emit();
          // this.taskACompletamento={status:"", signature:""};
        },
        error: (badResponse) => 
        {
          // Gestisci l'errore qui
          console.error('Update failed', badResponse);
        }
    });
  }

}
