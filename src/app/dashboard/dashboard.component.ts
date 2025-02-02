import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { Profile } from '../model/Profile';
import { ProfilesService } from '../services/profiles.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    MatIconModule, 
    RouterLinkActive, 
    MatTooltip, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements AfterViewInit, OnInit{

  idPopover: number = 0;

  imageUrl: string | null = null;

  profile_to_send: Profile = {id: null, name: '', surname: '', user: '' }; 

  constructor
  (
    private http: HttpClient, 
    public authService:AuthService, 
    private profileService:ProfilesService,
    private domSanitizer: DomSanitizer
  )
  { 
    this.profileService.getAll().subscribe(data=> {
      this.profiles=data

      for(let p of this.profiles) {
        this.profileService.getPropic(p.id).subscribe({
          next: data=> 
          {
            // image = this.profileService.getUrlFromBlob(data)
            if(data)
            {
              let imgUrl = URL.createObjectURL(data);
              this.imgUrls[p.id!] = this.domSanitizer.bypassSecurityTrustUrl(imgUrl);
            }
          },
          error: err => 
          {
            console.log(err);
          }
        })
      }
  }) 
}


  imgUrls:{[key: string]: SafeUrl} = {};

  profile!:Profile;
  propicData:any;
  profiles:Profile[] = []

  selectedFile: File | null = null;

  isFileSelected: boolean = false;
  isClicked = false;
  isSidebarOpen = true; 
  areProfilesVisible = true;

  isPopoverOpen: boolean = false;

  img:string = "";

  ngOnInit(): void 
  {
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

  showToastDiv = false; 
  isVisible = false;

  showToast() {
    this.showToastDiv = true; 
    setTimeout(() => {
      this.isVisible = true; 

      setTimeout(() => {
        this.hideToast();
      }, 3000);
    }, 100); 
  }

  hideToast() {
    this.isVisible = false; 
    setTimeout(() => {
      this.showToastDiv = false;
    }, 500);
  }

  showPopover(id: number) {
    this.idPopover = id;
    this.isPopoverOpen = true;
    console.log(this.isPopoverOpen);
  }

  cancelPopover() {
    this.isPopoverOpen = false;
    console.log(this.isPopoverOpen);
  }

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

    /**
     * ? pathname gli piace, location no...
     */
    if (window.location.pathname === '/userPage') {
      window.location.reload();
  }

  }

  toggleForm() {
    this.isClicked = !this.isClicked;
    this.isFileSelected = false;
  }
  
  onSubmit() {

    const formData = new FormData();
    if (this.selectedFile != null)
    {
      formData.append('file', this.selectedFile!, this.selectedFile!.name);
    }
    this.profile_to_send.user = localStorage.getItem("username")!;


    this.profileService.createNewProfile(this.profile_to_send)
    .subscribe(
      {
        next: data =>
        {
          this.profiles.push(data);
          console.log(data)
          
          if (this.selectedFile != null)
          {
          this.http.post(`api/profiles/imgupload/${data.id}`, formData, { responseType: 'text' })
          .subscribe(
            {
              next:img => 
              {

                console.log(img);
                console.log(this.imgUrls);

                this.profileService.getPropic(data.id).subscribe({
                  next: ok=> 
                  {
                    let imgUrl = URL.createObjectURL(ok);
                    this.imgUrls[data.id!] = this.domSanitizer.bypassSecurityTrustUrl(imgUrl);
                  },
                  error: err => 
                  {
                    console.log(err);
                  }
                })
              },
              // ! Ho dovuto compiere l'operazione di aggiunta propic su nuovo profilo qui 
              // ! perché per qualche motivo, pur funzionando il metodo, parte l'errore 
              // ! e non il next e quindi al momento va così...
              /**
               * Il problema era che Angular si aspetta una risposa in json,
               *  ma il metodo "api/profiles/imgupload/${data.id}" riporta una stringa,
               *  quindi dobbiamo dire a angular che la risposta è un semplice text (a riga 233)
               * 
               * @fede 
               */
              error: badResponse=>
              {
                console.error("IMAGE FAILED", badResponse)
                
              }
            }
          )
        }
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

  isDeleteToastVisible:boolean = true;
  showDeleteToastDiv = false;
  isDeleteVisible = false;

  showDeleteToast()
  {
    this.showDeleteToastDiv = true;
    setTimeout(() => {
      this.isDeleteVisible = true;

      setTimeout(() => {
        this.hideDeleteToast();
      }, 3000);
    }, 100);
  }

  hideDeleteToast()
  {
    this.isDeleteVisible = false;
    setTimeout(() => {
      this.showDeleteToastDiv = false;
    }, 500);
  }

  deleteProfile(profileId : number){
    let profile_to_delete:Profile = this.profiles.filter(p => p.id === profileId)[0];
    let index:number = this.profiles.indexOf(profile_to_delete);

    this.profileService.delete(profileId).subscribe({
      next: data => {
        console.log('Profilo eliminato con successo:', data);
        console.log(index);
        this.profiles.splice(index,1);

        delete this.imgUrls[profileId]
        
        if(Number(this.userId) === data.id)
        {
            localStorage.setItem("profilename", this.email!);
            localStorage.setItem("profilesurname", "");
            this.userName = localStorage.getItem("profilename");
            this.userSurname = localStorage.getItem("profilesurname");
        }

        console.log(this.backupProfiles);
        this.showDeleteToast();
      },
      error: badResponse => {
        console.log(badResponse);
      }
    });

    this.isPopoverOpen = false;
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.userMenu0.nativeElement.contains(event.target);

    if (!clickedInside && this.isUserMenuOpen) {
      this.isUserMenuOpen = false;
      this.userMenu.nativeElement.classList.add('hidden');
    }
  }
}
