import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

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
