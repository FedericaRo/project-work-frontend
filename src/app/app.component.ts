import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormRegisterComponent } from "./form-register/form-register.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CommunicationListComponent } from "./communication-list/communication-list.component";
import { CommunicationFormComponent } from "./communication-form/communication-form.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, FormRegisterComponent, LoginPageComponent,
    RegisterPageComponent, DashboardComponent, CommunicationListComponent, CommunicationFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(public authService:AuthService){}
  
  title = 'project-work-frontend';
}
