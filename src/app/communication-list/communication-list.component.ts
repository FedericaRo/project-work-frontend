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
    this.isVisibleD = false; 
    setTimeout(() => {
      this.showDeleteToastDiv = false; 
    }, 500); 
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
    this.isVisible = false; 
    setTimeout(() => {
      this.showToastDiv = false;
    }, 500); 
  }


  filterByEverything(): void 
  {
    if (this.filterCriteria) 
    {
      const criteria = this.filterCriteria.toLowerCase();
      this.communications = this.communicationsBackup.filter(product =>
        this.matchesCriteria(product, criteria)
      );
    } 
    else 
    {
      this.communications = [...this.communications];
    }

    console.log('Communications after filtering:', this.communications);
  }

  private matchesCriteria(com: Communication, criteria: string): boolean {

    const values = [...Object.values(com).filter(v => v != null)];
    console.log('Values to match:', values);
    console.log('Criteria:', criteria);

    return values.some(value =>
      value.toString().toLowerCase().includes(criteria)
    );
  }
}
