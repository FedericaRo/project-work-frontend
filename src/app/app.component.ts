import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormRegisterComponent } from "./form-register/form-register.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from './register-page/register-page.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, FormRegisterComponent, LoginPageComponent, RegisterPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project-work-frontend';
}
