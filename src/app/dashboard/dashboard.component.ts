import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatIconModule, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {

  constructor(public authService:AuthService){}

  @ViewChild('userMenu0') userMenu0!: ElementRef;
  @ViewChild('userMenu') userMenu!: ElementRef;

  ngAfterViewInit(): void 
  {
    // this.userMenu.nativeElement.
    
  }

  isSidebarOpen = true; // State variable to track sidebar visibility

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar visibility
    console.log(this.isSidebarOpen);
  }


  isUserMenuOpen = false; // State variable to track sidebar visibility

  toggleUserMenu() {

    this.isUserMenuOpen = !this.isUserMenuOpen; // Toggle the sidebar visibility
    console.log(this.isUserMenuOpen);
  }


  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent): void {
  //   const clickedInside = this.userMenu.nativeElement.contains(event.target);

  //   if (!clickedInside) {
  //     this.removeUserMenuClass();
  //   }
  // }

  // removeUserMenuClass(): void {
  //   // Rimuove una classe specifica dall'elemento `#userMenu`
  //   this.userMenu.nativeElement.classList.remove('hidden');
  // }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.userMenu0.nativeElement.contains(event.target);

    if (!clickedInside && this.isUserMenuOpen) {
      // Solo chiudi se il menu è aperto e il clic è avvenuto all'esterno
      this.isUserMenuOpen = false;
      this.userMenu.nativeElement.classList.add('hidden');
    }
  }
}
