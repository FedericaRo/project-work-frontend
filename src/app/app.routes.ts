import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoggedGuardService } from './services/guards/logged-guard.service';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
    // {path:"",component:HomepageComponent},
        { path: '', redirectTo: 'homepage', pathMatch: 'full', },
        { path: 'auth/login', component: LoginPageComponent },
        { path: 'auth/register', component: RegisterPageComponent },
        { path: 'homepage', component: HomepageComponent, canActivate: [LoggedGuardService] },
];
