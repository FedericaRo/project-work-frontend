import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css'
})
export class FormRegisterComponent {


  register() {
  throw new Error('Method not implemented.');
  }


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
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.[a-z])(?=.[A-Z])(?=.\d)[a-zA-Z\d]{8,}$')]),
      passwordConfirmation: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    }, 
    // { validators: passwordMatchCheck('password','passwordConfirmation')}
    // ^(?=.[a-z])(?=.[A-Z])(?=.\d).{8,}$

  )

}
