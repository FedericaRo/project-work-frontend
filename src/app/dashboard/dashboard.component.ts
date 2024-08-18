import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { ProfileListComponent } from "../profile-list/profile-list.component";
import { Profile } from '../model/Profile';
import { ProfilesService } from '../services/profiles.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    MatIconModule, 
    RouterLinkActive, 
    ProfileListComponent, 
    MatTooltip, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements AfterViewInit {

  imageUrl: string | ArrayBuffer | null = null;

  profile_to_send: Profile = {id: null, name: '', surname: '', user: '' }; 

  constructor(private http: HttpClient, public authService:AuthService, private profileService:ProfilesService) {
    this.profileService.getAll().subscribe(data=>{this.profiles=data})
  }

  @ViewChild('profileGrid') fatherElement!: ElementRef;
  @ViewChild('profileGrid') profileGrid!: ElementRef;
  @ViewChild('profileGrid') formix!: ElementRef;
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
  userId = localStorage.getItem('profileid')
  email = localStorage.getItem("username")

  profile!:Profile;
  propicData:any;
  profiles:Profile[] = []

  selectedFile: File | null = null;

  isFileSelected: boolean = false;
  isClicked = false;
  isSidebarOpen = true; 
  areProfilesVisible = true;

  img:string = "";

  

  @HostListener('document:click', ['$event'])
  onOverlayClick(event: MouseEvent): void {
    // Verifica se il clic è avvenuto esattamente sull'elemento padre
    const clickedInsideFather = this.fatherElement.nativeElement === event.target;
    const clickedInsideProfileGrid = this.profileGrid.nativeElement.contains(event.target);
    const clickedInsideProfilex = this.formix.nativeElement.contains(event.target);

    if (!clickedInsideProfileGrid && ! clickedInsideProfilex) {
      // Clic esattamente sul padre
      this.areProfilesVisible = !this.areProfilesVisible;
      console.log('Clic sul padre:', event.target);
    } else if (clickedInsideFather) {
      // Clic all'esterno dell'elemento padre e del figlio
      this.areProfilesVisible = false;
    }

    console.log('Cliccato:', event.target); // Debug
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.img = this.selectedFile.name;
    this.isFileSelected = true;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; 
    console.log(this.isSidebarOpen);
  }

  toggleProfileList() {
    this.areProfilesVisible = !this.areProfilesVisible;
    this.isFileSelected = false;
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
    this.userId = localStorage.getItem("profileid");

    // this.toggleProfileList();
  }

  toggleForm() {
    this.isClicked = !this.isClicked;
    this.isFileSelected = false;
  }
  
  onSubmit() {

    const formData = new FormData();
    formData.append('file', this.selectedFile!, this.selectedFile!.name);
    this.profile_to_send.user = localStorage.getItem("username")!;


    this.profileService.createNewProfile(this.profile_to_send)
    .subscribe(
      {
        next: data =>
        {
          this.profiles.push(data);
          console.log(data)
          this.http.post(`api/profiles/imgupload/${data.id}`, formData)
          .subscribe(
            {
              next:data => 
              {
                console.log(data)
              },
              error: badResponse=>
              {
                console.error("IMAGE FAILED", badResponse)
              }
            }
          )
        },
        error: badResponse=>
        {
          console.error("PROFILE FAILED", badResponse)
        },
        complete: () => {
          this.profile_to_send = {id: null, name: '', surname: '', user: '' }; 
          this.selectedFile = null;
          this.isFileSelected = false;
          this.isClicked = false;
        }
      }
    )
    
  }

  backupProfiles:Profile[] = [];

  deleteProfile(profileId : number){
    let profile_to_delete:Profile = this.profiles.filter(p => p.id === profileId)[0];
    let index:number = this.profiles.indexOf(profile_to_delete);

    this.profileService.delete(profileId).subscribe({
      next: data => {
        console.log('Profilo eliminato con successo:', data);
        console.log(index);
        this.profiles.splice(index,1);

        if(Number(this.userId) === data.id)
        {
            localStorage.setItem("profilename", this.email!);
            localStorage.setItem("profilesurname", "");
            this.userName = localStorage.getItem("profilename");
            this.userSurname = localStorage.getItem("profilesurname");
        }

        console.log(this.backupProfiles);
        // this.profiles = this.backupProfiles;
      },
      error: badResponse => {
        console.log(badResponse);
      }
    });
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.userMenu0.nativeElement.contains(event.target);

    if (!clickedInside && this.isUserMenuOpen) {
      // Solo chiudi se il menu è aperto e il clic è avvenuto all'esterno
      this.isUserMenuOpen = false;
      this.userMenu.nativeElement.classList.add('hidden');
    }
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

}
