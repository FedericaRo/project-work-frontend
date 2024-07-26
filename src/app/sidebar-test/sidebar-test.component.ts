import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-test.component.html',
  styleUrl: './sidebar-test.component.css'
})
export class SidebarTestComponent {

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
 