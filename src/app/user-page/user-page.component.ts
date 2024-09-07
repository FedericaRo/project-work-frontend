import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ProfilesService } from '../services/profiles.service';
import { HttpClient } from '@angular/common/http';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Profile } from '../model/Profile';
import { TaskService } from '../services/task.service';
import { CommunicationsService } from '../services/communications.service';
import { Communication } from '../model/Communication';
import { Task } from '../model/Task';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule, MatTooltip, MatFormFieldModule, MatInputModule, MatIconModule, MatFormField, ReactiveFormsModule, MatInputModule, FormsModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit {

  constructor(
                private profileService:ProfilesService,
                private taskService: TaskService,
                private comService: CommunicationsService, 
                private http: HttpClient
             ){}
 
  
  ngOnInit(): void 
  {
    this.profileService.getPropic(this.userId).subscribe
    (
      {
        next: data=> {
          this.imgUrl = URL.createObjectURL(data)
          console.log(data);
        },
        error: badResponse=> {
          console.log(badResponse);
        }
      }
    )

    this.taskService.getAll().subscribe
    (
      {
        next: data=> {
          this.tasks = data;

          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
          this.taskCompleted = this.tasks.filter(t => 
            Number(t.signature.split(" ")[1]) === this.userId && new Date(t.creationDate) >= sixMonthsAgo
          );

          this.numberTaskCompleted = this.taskCompleted.length;
        },
        error: badResponse=> {
          console.log(badResponse);
        }
      }
    )

    this.comService.getAll().subscribe
    (
      {
        next: data=> {
          this.communications = data;
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

          // * Da noi
          this.commFromUs = this.communications.filter(c => 
            c.fromPerson.toLowerCase().includes(this.username.toLowerCase()) && new Date(c.creationDate) >= sixMonthsAgo && c.type === "CAMBIOTURNO"
          );

          this.numberCommFromUs = this.commFromUs.length;

          // * Per noi
          this.commForUs = this.communications.filter(c => 
            c.toPerson.toLowerCase().includes(this.username.toLowerCase()) && new Date(c.creationDate) >= sixMonthsAgo && c.type === "CAMBIOTURNO"
          );

          this.numberCommForUs = this.commForUs.length;

          console.log(this.communications);
          console.log(this.numberCommForUs);
          console.log("Comunicazioni per noi ",this.commForUs);
          console.log(this.numberCommFromUs);
          console.log("Comunicazioni da noi ",this.commFromUs);
        },
        error: badResponse=> {
          console.log(badResponse);
        }
      }
    )

  }

  tasks: Task[] = []
  communications: Communication[] = []

  taskCompleted: Task[] = [];
  commFromUs: Communication[] = [];
  commForUs: Communication[] = [];

  numberTaskCompleted: number = 0; 
  numberCommFromUs: number = 0; 
  numberCommForUs: number = 0; 
  
  isEditModeActive: boolean = false;
  
  email: string = localStorage.getItem("username") ? localStorage.getItem("username")! : "esempio@email.com";
  username: string = localStorage.getItem("profilename") ? localStorage.getItem("profilename")! : "Nome";
  usersurname: string = localStorage.getItem("profilesurname") ? localStorage.getItem("profilesurname")! : "Cognome";
  userId: number =  Number(localStorage.getItem("profileid")) ?  Number(localStorage.getItem("profileid"))! : -1;
  role: string = localStorage.getItem("role")!;
  
  imgUrl: string = "";
  
  selectedFile: File | null = null;
  isFileSelected: boolean = false;
  img:string = "";
  
  profile: Profile = {id: this.userId, name: this.username, surname: this.usersurname, user: this.email }; 

  toggleEditMode(): void {
    this.isEditModeActive = !this.isEditModeActive;
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.changePropic();
  }

  changePropic(): void 
  {
    
    const file = new FormData();
    file.append('file', this.selectedFile!, this.selectedFile!.name);

    this.http.post(`api/profiles/imgupload/${this.userId}`, file, { responseType: 'text' })
        .subscribe
        (
          {
              next:img => 
              {

                  console.log(img);
                 
                  this.profileService.getPropic(this.userId).subscribe(
                  {
                    next: ok=> 
                    {
                      this.imgUrl = URL.createObjectURL(ok);
                      window.location.reload()
                    },
                    error: err => 
                    {
                      console.log(err);
                    }
                  })
              },
              error: badResponse=> 
              {
                console.log(badResponse);
              }   
          }
        )
  }

  updateProfile(): void {

    if(this.profile.name != this.username || this.profile.surname != this.usersurname)
    {
      this.profileService.update(this.userId, this.profile).subscribe(
        {
          next: data => 
          {
            console.log(data);
  
            localStorage.removeItem('profilename');
            localStorage.removeItem('profilesurname');
            localStorage.removeItem("profileid")
  
            localStorage.setItem("profilename",data.name);
            localStorage.setItem("profilesurname", data.surname);
            localStorage.setItem("profileid", data.id!.toString());
  
            this.username = localStorage.getItem("profilename")!;
            this.usersurname = localStorage.getItem("profilesurname")!;
            this.userId = Number(localStorage.getItem("profileid"))!;
          },
          error: badResponse => 
          {
            console.log(badResponse);
          }
        }
      )
    }
  }
          
}




