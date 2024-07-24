import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

export const routes: Routes = [
    // {path:"",component:HomepageComponent},
    {path:"auth/register",component:RegisterPageComponent},
    {path:"auth/login",component:LoginPageComponent},
];
