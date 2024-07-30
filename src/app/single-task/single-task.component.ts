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
export class SingleTaskComponent{

  taskACompletamento:completionTask={status:"", signature:""}

  constructor(public authService:AuthService, private taskService:TaskService, private http:HttpClient){}


  // signature:string="";

  @Input() task!:Task;
  userRole:string= this.authService.getUserRole()!;
  
  isChecked:boolean=false;

  toggleCheckbox() {
    this.isChecked = !this.isChecked;
  }


  switchStatus():void {
    if(this.isChecked)
    {
      this.taskACompletamento.status='COMPLETATO';
      this.taskACompletamento.signature=this.userRole;
      console.log(this.userRole);
      console.log(this.taskACompletamento.signature);
    }
    else
    {
      this.taskACompletamento.status='DAFARSI';
      this.taskACompletamento.signature!="";
    }
  }




  updateTaskSon() 
  {
      this.toggleCheckbox();
      this.switchStatus();

      this.taskService.update(this.task.id!, this.taskACompletamento)
      .subscribe({
        next: () => {
          // this.updateTask.emit();
          this.taskACompletamento={status:"", signature:""};
        },
        error: (badResponse) => 
        {
          // Gestisci l'errore qui
          console.error('Update failed', badResponse);
        }
    });
  }

}
