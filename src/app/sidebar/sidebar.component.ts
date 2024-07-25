import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormRegisterComponent } from "../form-register/form-register.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,

  imports: [MatIconModule, FormRegisterComponent,CommonModule, RouterOutlet],

 

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(){}

  showModal:boolean = false;

  toggleModal() {
    this.showModal=!this.showModal;
  }

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
