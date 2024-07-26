import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { passwordMatchCheck } from '../validators/passwordCheck';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  constructor(private authService:AuthService, private router: Router){}

  

  passwordInputType: 'password' | 'text' = 'password';
  passwordConfirmInputType: 'password' | 'text' = 'password';

  togglePasswordVisibility(): void {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
    // If you need to toggle icons or other elements based on this state, 
    // you would update those states here as well.
  }

  togglePasswordConfirmationVisibility(): void {
    this.passwordConfirmInputType = this.passwordConfirmInputType === 'password' ? 'text' : 'password';
    // If you need to toggle icons or other elements based on this state, 
    // you would update those states here as well.
  }

  registerForm:FormGroup = new FormGroup
  (
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, ]),   //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')
      passwordConfirmation: new FormControl('', [Validators.required]),
      // role: new FormControl('', [Validators.required])
    }, { validators: passwordMatchCheck('password','passwordConfirmation')}
    // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$
    
  )
  register()
  {
      this.authService.register(this.registerForm.value)
      .subscribe(
        {
          next: data => 
          {
            console.log(data)
            this.authService.login(this.registerForm.value).subscribe(
              data=>
              {
                localStorage.setItem("token",data.accessToken);
                localStorage.setItem("role", data.role);
                alert(`Sei loggato come user ${this.registerForm.value.username}`)
                this.router.navigate(['homepage']);
              },
            );
            
            this.registerForm.reset();
            
          },
          error: err =>
          {
            console.log("NOOOOO")
            console.log(err);
          }
        }
      )
  }
}
