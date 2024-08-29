import { Component, OnInit } from '@angular/core';
import { CommunicationsService } from '../services/communications.service';
import { Communication } from '../model/Communication';
import { CommunicationComponent } from "../communication/communication.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommunicationFormComponent } from "../communication-form/communication-form.component";
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-communication-list',
  standalone: true,
  imports: [CommunicationComponent, CommonModule, FormsModule, MatIconModule, CommunicationFormComponent, MatButtonModule, MatTooltipModule],
  templateUrl: './communication-list.component.html',
  styleUrl: './communication-list.component.css'
})
export class CommunicationListComponent implements OnInit
{

  constructor(private communicationService:CommunicationsService){}

  communications:Communication[] = [];
  communicationsBackup:Communication[] = [];

  genericError: string = '';

  filterCriteria: string = '';

  showForm:boolean = false;

  toggleForm():void
  {
    this.showForm = !this.showForm;
  }

  ngOnInit(): void 
  {
      this.communicationService.getAll().subscribe(data => {
      this.communications = data.reverse();
      console.log(this.communications)})

      this.communicationService.getAll().subscribe(data => {
        this.communicationsBackup = data.reverse();});  
  }

  isDeleteToastVisible: boolean = true;
  showDeleteToastDiv = false;
  isVisibleD = false;

  showDeleteToast(){
    this.showDeleteToastDiv = true;
    setTimeout(() => {
      this.isVisibleD = true;

      setTimeout(() => {
        this.hideDeleteToast();
      }, 3000);
    }, 100);
  }
  
  hideDeleteToast() {
    this.isVisibleD = false; // Trigger the fade-out effect
    setTimeout(() => {
      this.showDeleteToastDiv = false; // Remove the toast from the DOM after fade-out
    }, 500); // Match this duration with the CSS transition duration
  }

  animateError()
  {
    const alertElement = document.getElementById('alert');
    if(alertElement){
      alertElement.classList.add('show');
      setTimeout(() => {
        alertElement.classList.add('hide');
        setTimeout(() => {
          alertElement.classList.remove('show', 'hide');
        }, 500);
      }, 5000);
    }
  }

  errorAlert(errore:string)
  {
    this.genericError = errore;
    this.animateError();
  }


  deleteCommunication(id: number): void {
    this.communicationService.delete(id).subscribe({
      next: () => {
        this.communications = this.communications.filter(c => c.id !== id);
        this.showDeleteToast();
      },
      error: (error) => {
        console.error("Errore durante l'eliminazione:", error);
        this.errorAlert(error.error);
      }
    });
  }

  addNewCommunication(communication:Communication) 
  {
    this.communications.unshift(communication);
    this.toggleForm();
    this.showToast();
  }

  isToastVisible:boolean = true;
  showToastDiv = false;
  isVisible = false;

  showToast(){
    this.showToastDiv = true;
    setTimeout(() => {
      this.isVisible = true;

      setTimeout(() => {
        this.hideToast();
      }, 3000);
    }, 100);
  }
  
  hideToast() {
    this.isVisible = false; // Trigger the fade-out effect
    setTimeout(() => {
      this.showToastDiv = false; // Remove the toast from the DOM after fade-out
    }, 500); // Match this duration with the CSS transition duration
  }

  filterByEverything(): void 
  {
    this.communications = this.communicationsBackup;

    for (let communication of this.communications) 
      {
        if (communication.communicationName.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
          this.communications = this.communications.filter(c => c.communicationName.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        } else if (communication.fromPerson.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
          this.communications = this.communications.filter(c => c.fromPerson.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        } else if (communication.toPerson.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
          this.communications = this.communications.filter(c => c.toPerson.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        } else if (communication.type.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
          this.communications = this.communications.filter(c => c.type.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        } else if (communication.description.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
          this.communications = this.communications.filter(c => c.description.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        } else if (communication.importance.toLowerCase().includes(this.filterCriteria.toLowerCase())) {
          this.communications = this.communications.filter(c => c.importance.toLowerCase().includes(this.filterCriteria.toLowerCase()));
        }
    }
  }
  
  
}
