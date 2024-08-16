import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { ProfileListComponent } from "../profile-list/profile-list.component";
import { Profile } from '../model/Profile';
import { ProfilesService } from '../services/profiles.service';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatIconModule, RouterLinkActive, ProfileListComponent, MatTooltip],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {

  imageUrl: string | ArrayBuffer | null = null;

  constructor(public authService:AuthService, private profileService:ProfilesService) {
    this.profileService.getAll().subscribe(data=>{this.profiles=data})
  }

  @ViewChild('profileGrid') fatherElement!: ElementRef;
  @ViewChild('profileGrid') profileGrid!: ElementRef;
  @ViewChild('userMenu0') userMenu0!: ElementRef;
  @ViewChild('userMenu') userMenu!: ElementRef;

  /**
   * *Serve per usare i nativeElements con i ViewChild e può essere usato tutto ciò solo
   * *se la classe è implementata da AfterViewInit
   * @Santo
   */
  ngAfterViewInit(): void {console.log('Elemento profileGrid:', this.fatherElement.nativeElement);}

  userName = localStorage.getItem("profilename")
  userSurname = localStorage.getItem("profilesurname")

  profile!:Profile;
  propicData:any;
  profiles:Profile[] = []

  isSidebarOpen = true; 
  areProfilesVisible = true;

  @HostListener('document:click', ['$event'])
  onOverlayClick(event: MouseEvent): void {
    // Verifica se il clic è avvenuto esattamente sull'elemento padre
    const clickedInsideFather = this.fatherElement.nativeElement === event.target;
    const clickedInsideProfileGrid = this.profileGrid.nativeElement.contains(event.target);

    if (!clickedInsideProfileGrid) {
      // Clic esattamente sul padre
      this.areProfilesVisible = !this.areProfilesVisible;
      console.log('Clic sul padre:', event.target);
    } else if (clickedInsideFather) {
      // Clic all'esterno dell'elemento padre e del figlio
      this.areProfilesVisible = false;
    }

    console.log('Cliccato:', event.target); // Debug
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; 
    console.log(this.isSidebarOpen);
  }

  toggleProfileList() {
    this.areProfilesVisible = !this.areProfilesVisible;
  }


  isUserMenuOpen = false; 

  toggleUserMenu() {

    this.isUserMenuOpen = !this.isUserMenuOpen; 
    console.log(this.isUserMenuOpen);
  }

  changeProfile(profile:Profile): void {
    
    localStorage.removeItem('profilename');
    localStorage.removeItem('profilesurname');
    localStorage.removeItem("profileid")

    localStorage.setItem("profilename",profile.name);
    localStorage.setItem("profilesurname", profile.surname);
    localStorage.setItem("profileid", profile.id!.toString());

    this.userName = localStorage.getItem("profilename");
    this.userSurname = localStorage.getItem("profilesurname");

    this.toggleProfileList();
  }
 

  // propic(profile:Profile):string | null{
  //   let imageUrl: string | ArrayBuffer | null = null;

  //   this.profileService.getPropic(profile.id).subscribe(imageBlob => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       this.imageUrl = reader.result;
  //     };
  //     reader.readAsDataURL(imageBlob);
  //   })

  //   return imageUrl;
  // }

  // profilePropic(profile:Profile):any {
  //   this.profileService.getPropic(profile).subscribe(data => {
  //     this.propicData = data;
  //   })

  //   return this.propicData;
  // }

  


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
