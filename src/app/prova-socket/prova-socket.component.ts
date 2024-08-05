import { Component } from '@angular/core';
import { StompService } from '../services/stomp.service';

@Component({
  selector: 'app-prova-socket',
  standalone: true,
  imports: [],
  templateUrl: './prova-socket.component.html',
  styleUrl: './prova-socket.component.css'
})
export class ProvaSocketComponent {

  invia() 
  {
    this.sock.send("/ricevitore", "messaggino che tutto funziona");
  }
  numero:number= 0;
  
  constructor(private sock:StompService){
    sock.subscribe('/topic/calza', (m) => this.numero++)
  }

}
