import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(public authService:AuthService, private router: Router){}

  passwordInputType: 'password' | 'text' = 'password';
  error:string = "";
  
  togglePasswordVisibility(): void {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
  }

  loginForm:FormGroup = new FormGroup
  (
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }
    
  )


  login()
  {

    this.authService.login(this.loginForm.value).subscribe(
      {
        next: data=>
        {
          localStorage.setItem("token",data.accessToken);
          localStorage.setItem("role",data.role);
          localStorage.setItem("username",data.username);
          this.router.navigate(["homepage"]);
        },
        error: err=>
        {
          console.log(err)
          this.error = err.error;
        } 
      }
    )
  }
}
