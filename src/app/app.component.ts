import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormRegisterComponent } from "./form-register/form-register.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CommunicationListComponent } from "./communication-list/communication-list.component";
import { CommunicationFormComponent } from "./communication-form/communication-form.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingService } from './services/loading.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, FormRegisterComponent, LoginPageComponent,
    RegisterPageComponent, DashboardComponent, CommunicationListComponent, CommunicationFormComponent, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  isLoading: boolean = false;

  constructor(public authService:AuthService, private loadingService: LoadingService){}

  ngOnInit() {
    this.loadingService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }
  
  title = 'project-work-frontend';
}
