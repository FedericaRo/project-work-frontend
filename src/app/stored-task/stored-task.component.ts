import { Component, EventEmitter, Input, Output, ElementRef, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StoredTask } from '../model/StoredTask';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-stored-task',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTooltipModule],
  templateUrl: './stored-task.component.html',
  styleUrls: ['./stored-task.component.css']
})
export class StoredTaskComponent {
  constructor(
    public authService: AuthService,
    private elementRef: ElementRef // Per rilevare clic esterni
  ) {}

  @Input() storedTask!: StoredTask;

  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<StoredTask>();

  isEditing: boolean = false;
  showPopOver: boolean = false;

  onUpdate(): void {
    if (this.storedTask.id !== null && this.storedTask.id !== undefined) {
      this.update.emit(this.storedTask);
      this.isEditing = false;
    } else {
      console.error('ID non valido');
    }
  }

  onEdit(): void {
    this.isEditing = true;
  }

  onCancelEdit(): void {
    this.isEditing = false;
  }

  onDelete(): void {
    this.showPopOver = true; 
  }

  confirmDelete(): void {
    if (this.storedTask.id !== null && this.storedTask.id !== undefined) {
      this.delete.emit(this.storedTask.id);
      this.showPopOver = false;
    } else {
      console.error('ID non valido');
    }
  }

  // Aggiungi questo metodo per chiudere il popover al clic esterno
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.showPopOver) {
      this.showPopOver = false;
    }
  }
}
