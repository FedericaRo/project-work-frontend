import { Component, OnInit } from '@angular/core';
import { CommunicationsService } from '../services/communications.service';
import { Communication } from '../model/Communication';
import { CommunicationComponent } from "../communication/communication.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommunicationFormComponent } from "../communication-form/communication-form.component";

@Component({
  selector: 'app-communication-list',
  standalone: true,
  imports: [CommunicationComponent, CommonModule, FormsModule, MatIconModule, CommunicationFormComponent],
  templateUrl: './communication-list.component.html',
  styleUrl: './communication-list.component.css'
})
export class CommunicationListComponent implements OnInit
{

  constructor(private communicationService:CommunicationsService){}

  communications:Communication[] = [];
  communicationsBackup:Communication[] = [];

  filterCriteria: string = '';

  showForm:boolean = false;

  toggleForm():void
  {
    this.showForm = !this.showForm;
  }

  

  ngOnInit(): void 
  {
      this.communicationService.getAll().subscribe(data => {
      this.communications = data;
      console.log(this.communications)})

      this.communicationService.getAll().subscribe(data => {
        this.communicationsBackup = data;});  
  }

  deleteCommunication(id: number): void 
  {
    this.communicationService.delete(id).subscribe(() => {
      this.communications = this.communications.filter(c => c.id !== id);
    }, error => {
      console.error("Errore durante l'eliminazione:", error);
    });
  }

  // addNewCommunication() 
  // {
  //   throw new Error('Method not implemented.');
  // }

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
