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
  register() {
    
    console.log('Inizio del metodo register');
    console.log('Valori del form:', this.registerForm.value);
  
    this.authService.register(this.registerForm.value)
    .subscribe(
      {
        next: data => {
          console.log('Registrazione avvenuta con successo:', data);
            console.log('Inizio del processo di login...');
  
            this.authService.login(this.registerForm.value).subscribe(
              {

              next: data =>
              {
                console.log('Login avvenuto con successo:', data);
                localStorage.setItem("token", data.accessToken);
                localStorage.setItem("role", data.role);
                localStorage.setItem("username", data.username);
                console.log('Impostato token e role in localStorage');
                this.router.navigate(['homepage']);
                console.log('Navigazione verso la homepage');
                this.registerForm.reset();
                console.log('Form resettato');
              },
              error: badResponse=> {
                console.log('Errore durante il login:', badResponse);
              }
            }
            );
          },
          error: err => {
            // event.preventDefault()
            console.log('Errore durante la registrazione:', err);
            // this.router.navigate(['auth/register'])
            // this.animateError();
            this.registerForm.setErrors({'usernameTaken': true});
            console.log('Errore impostato nel form:', this.registerForm.errors);
            console.log('Errore impostato nel fcsdasdasdaorm:', this.registerForm.hasError('usernameTaken'));
            return;
          }
        }
      );
      console.log('Fine del metodo register');
    }

    animateError() {
      const alertElement = document.getElementById('alert');
      if (alertElement) {
        alertElement.classList.add('show');
        setTimeout(() => {
          alertElement.classList.add('hide');
          setTimeout(() => {
            alertElement.classList.remove('show', 'hide');
          }, 500); // Durata dell'animazione di uscita
        }, 5000); // Durata della visualizzazione
      }
    }
  }
  