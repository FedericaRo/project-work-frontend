import { Component, Input } from '@angular/core';
import { Communication } from '../model/Communication';
import { CommonModule } from '@angular/common';
import { CommunicationComponent } from '../communication/communication.component';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-filtered-communication-card',
  standalone: true,
  imports: [CommonModule, CommunicationComponent],
  templateUrl: './filtered-communication-card.component.html',
  styleUrl: './filtered-communication-card.component.css'
})
export class FilteredCommunicationCardComponent {

  constructor(private colorService:ColorService) {};

  getTypeLable() : string
  {
    return this.colorService.typeLable(this.communication.type);
  }

  getImportanceLable() : string
  {
    return this.colorService.importanceLable(this.communication.importance);
  }

  
  
  

  @Input() communication!: Communication;

  // getTypeLable() : string
  // {
  //   return CommunicationComponent.prototype.typeLable.call(this, this.communication.type);
  // }

  // getImportanceLable() : string
  // {
  //   return CommunicationComponent.prototype.importanceLable.call(this, this.communication.importance);
  // }






}
