import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent 
{

  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.selectedFile!, this.selectedFile!.name);

    this.http.post('api/imgupload', formData)
      .subscribe(response => {
        console.log(response)
      }, error => {

      });
  }

}
