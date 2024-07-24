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

  togglePasswordVisibility(): void {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
    // If you need to toggle icons or other elements based on this state, 
    // you would update those states here as well.
  }

  loginForm:FormGroup = new FormGroup
  (
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }
    
  )

  // requestFasulla()
  // {
  //   this.authService.requestFauslla().subscribe();
  // }

  // logout()
  // {
  //   this.authService.logout();
  // }

  login()
  {
    //MOCK, li prende da una form ovviamente
    // let username = 'stefano@mailfinta.fint';
    // let password = 'paperino2';

    this.authService.login(this.loginForm.value).subscribe(
      {
        next: data=>
        {
          localStorage.setItem("token",data.accessToken);
          localStorage.setItem("role",data.role);
          this.router.navigate(['']);
        },
        error: err=>
        {
          console.log(err)
        }

      }
    )
  }
}
