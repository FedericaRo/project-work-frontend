import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class DashboardComponent {

  constructor(public authService:AuthService){}


  isSidebarOpen = true; // State variable to track sidebar visibility

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar visibility
    console.log(this.isSidebarOpen);
  }


  isUserMenuOpen = true; // State variable to track sidebar visibility

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen; // Toggle the sidebar visibility
    console.log(this.isUserMenuOpen);
  }

}
