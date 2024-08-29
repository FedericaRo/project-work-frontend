import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ProfilesService } from '../services/profiles.service';
import { Profile } from '../model/Profile';


@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, 
    FormsModule, 
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent 
{

  selectedFile: File | null = null;

  
  // profileForm:FormGroup = new FormGroup
  // ({
  //   name: new FormControl('', Validators.required),
  //   surname: new FormControl('', Validators.required),
  // });

  profile: Profile = {id: null, name: '', surname: '', user: '' }; // Inizializza l'oggetto profile

  constructor(private http: HttpClient, private profileService:ProfilesService) {}

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }


  onSubmit() {

    const formData = new FormData();
    // formData.append('name', this.profileForm.get('name')!.value);
    // formData.append('surname', this.profileForm.get('surname')!.value);
    // formData.append('file', this.profileForm.get('profilePic')!.value);
    // const formData = new FormData();
    formData.append('file', this.selectedFile!, this.selectedFile!.name);

    // this.profileForm.('file', this.selectedFile!, this.selectedFile!.name);
    
    // this.profile.name = this.profileForm.get("name")!.value;
    // this.profile.surname = this.profileForm.get("surname")!.value;

    this.profile.user = localStorage.getItem("username")!;
    


    this.profileService.createNewProfile(this.profile)
    .subscribe(
      {
        next: data =>
        {
          console.log(data)
        if (this.selectedFile != null){

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
            }
            },
            error: badResponse=>
              {
                console.error("PROFILE FAILED", badResponse)
                
              }
            }
          )
  }

}
