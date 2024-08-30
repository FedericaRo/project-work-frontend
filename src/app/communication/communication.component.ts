import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Communication } from '../model/Communication';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CommunicationsService } from '../services/communications.service';

@Component({
  selector: 'app-communication',
  standalone: true,
  imports: [CommonModule,MatIconModule, DatePipe],
  templateUrl: './communication.component.html',
  styleUrl: './communication.component.css'
})
export class CommunicationComponent 
{
  pdfBlobUrl: string | null = null;
  
  constructor(public authService:AuthService, private communicationService:CommunicationsService){}
  
  @Input() communication!:Communication;

  @Output() delete = new EventEmitter<number>();
  @Output() displayAlertError = new EventEmitter<string>()
  

  typeLable(type: string): string 
  {
    switch (type.toUpperCase()) {
      case 'AMMINISTRATIVA':
        return 'bg-red-200 text-red-600 ';
      case 'ORGANIZZATIVA':
        return 'bg-yellow-200 text-yellow-600 font-bold';
      case 'INFORMATIVA':
        return 'bg-green-200 text-green-600 font-bold';
      case 'CAMBIOTURNO':
        return 'bg-blue-200 text-blue-600 font-bold';
      default:
        return 'bg-gray-200 text-white font-bold';
    }
  }

  
  
  importanceLable(importance: string): string
  {
    switch (importance.toUpperCase()){
      case 'ALTA':
        return 'bg-red-200 text-red-600 font-bold';
      case 'MEDIA':
        return 'bg-yellow-200 text-yellow-600 font-bold';
      case 'BASSA':
        return 'bg-green-200 text-green-600 font-bold';
        default:
        return 'bg-gray-200 text-white font-bold';
    }
  }
  
  onDelete(): void {
   
    // mi assicuro che communication.id non sia null o undefined
    if (this.communication.id !== null && this.communication.id !== undefined) {
      this.delete.emit(this.communication.id);
      // this.displayAlertError.emit(event)
    } else {
      console.error("ID della comunicazione è null o undefined");
      
    }
  }
  
  


  loadPdf(id: number) 
  {
   this.communicationService.getPdf(id).subscribe
   (
    {
      next: data =>
      {
        console.log(data)
        this.pdfBlobUrl = URL.createObjectURL(data);
          window.open(this.pdfBlobUrl, '_blank');
      },
      error: badResponse =>
      {
        console.log(badResponse);
        this.displayAlertError.emit(badResponse.error);
      }

    }
  )
  }


  // loadPdf(id: number) {
  //     this.communicationService.getPdf(id)
  //     .subscribe((blob: Blob) => {
  //         this.pdfBlobUrl = URL.createObjectURL(blob);
  //         window.open(this.pdfBlobUrl, '_blank');
  //       }, error => {
  //         console.error('PDF loading failed', error);
  //       });
    
  // }
  // getRandomRotation(): string {
  //   const min = -3;
  //   const max = 3;
  //   const randomDegree = Math.random() * (max - min) + min;
  //   return `rotate(${randomDegree}deg)`;
  // }
}
