import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';


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
  selectedFile: File | null = null;

  communicationForm:FormGroup = new FormGroup
  ({
    communicationName: new FormControl('', Validators.required),
    fromPerson: new FormControl('', Validators.required),
    toPerson: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    // creationDate: new FormControl(''),
    importance: new FormControl('', Validators.required)
  });


  constructor(private http: HttpClient, private communicationService:CommunicationsService){};

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  @ViewChild('fileInput') fileInput!: ElementRef;


  @Output() add = new EventEmitter<Communication>();

  onSubmit()
  {
    // form data per mandare il pdf
    
    const formData = new FormData();
    
    console.log(this.communicationForm.value)
    this.communicationService.addNewCommunication(this.communicationForm.value)
    .subscribe(
      {
        next: (communication:Communication) =>
          {
            if (this.selectedFile != null)
          {
            formData.append('file', this.selectedFile!, this.selectedFile!.name);

            this.http.post(`api/communications/pdfupload/${communication.id}`, formData,  { responseType: 'text' })
            .subscribe(
              {
                next:data => 
                  {
                    console.log(data)
                    communication.pdfFilePath = data;
                  },
                  error: badResponse=>
                    {
                      console.error("PDF FAILED", badResponse)
                    }
                    
                  }
                )
            }
              this.add.emit(communication);
              this.communicationForm.reset();
              // Togli il file dall'input
              this.fileInput.nativeElement.value = "";
              // Svuota la variabile che conteneva il file
              this.selectedFile = null;


        },
        error: badResponse=>
        {
          console.error("Errore nell'aggiunta di una nuova comunicazione", badResponse)
          
        }
      }

    )
  }

}
