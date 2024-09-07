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

  // timeByDate : string = "";

  getTimeFromDate() : string
  {
    let now = new Date();
    let creation = new Date(this.communication.creationDate);

    let diffInMs = now.getTime() - creation.getTime();
    let diffInHrs = diffInMs / (1000 * 60 * 60);
    let diffInMin = diffInMs / (1000 * 60)

    if (diffInHrs > 24) 
    {
      let res = `${(Math.floor(diffInHrs / 24))}g e ${Math.trunc(diffInHrs % 24)}ore fa`
      return res;
    }
    else if (diffInMin < 60)
    {
      return `${Math.trunc(diffInMin)} minuti fa`
    }

    return Math.trunc(diffInHrs).toString()+" ore fa";
  }

  @Input() communication!: Communication;
}
