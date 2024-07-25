import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule,RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarActive = false;
  activeMenu: string | null = null;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  setActive(menu: string) {
    this.activeMenu = menu;
  }

  isActive(menu: string) {
    return this.activeMenu === menu;
  }
}
