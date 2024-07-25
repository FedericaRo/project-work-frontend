import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoggedGuardService } from './services/guards/logged-guard.service';

export const routes: Routes = [
    // {path:"",component:HomepageComponent},
        { path: '', redirectTo: 'auth/login', pathMatch: 'full', },
        { path: 'auth/login', component: LoginPageComponent },
        { path: 'auth/register', component: RegisterPageComponent },
        { path: 'homepage', component: HomepageComponent, canActivate: [LoggedGuardService] },
];
