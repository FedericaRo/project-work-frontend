import { Component, EventEmitter, Output } from '@angular/core';
import { CommunicationsService } from '../services/communications.service';
import { Communication } from '../model/Communication';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@Component({
  selector: 'app-communication-form',
  standalone: true,
  imports: [ReactiveFormsModule, 
            FormsModule, 
            CommonModule,
            MatButtonModule,
            MatFormFieldModule,
            MatOptionModule,
            MatRadioModule,
            MatSelectModule,
            MatInputModule,
            MatButtonToggleModule
          ],
  templateUrl: './communication-form.component.html',
  styleUrl: './communication-form.component.css'
})
export class CommunicationFormComponent 
{

  communicationForm:FormGroup = new FormGroup
  ({
    communicationName: new FormControl('', Validators.required),
    fromPerson: new FormControl('', Validators.required),
    toPerson: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    creationDate: new FormControl(''),
    importance: new FormControl('', Validators.required)
  });


  constructor(private communicationService:CommunicationsService){};

  @Output() add = new EventEmitter<Communication>();

  onSubmit()
  {
    console.log(this.communicationForm.value)
    this.communicationService.addNewCommunication(this.communicationForm.value)
    .subscribe(
      {
        next: communication =>
        {
          this.add.emit(communication);
          this.communicationForm.reset();
        },
        error: badResponse=>
        {
          console.error("Errore nell'aggiunta di una nuova comunicazione", badResponse)
          
        }
      }

    )
  }

}
