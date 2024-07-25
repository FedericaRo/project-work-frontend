import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoggedGuardService } from './services/guards/logged-guard.service';
import { HomepageComponent } from './homepage/homepage.component';


export const routes: Routes = [

    {path:"products",component:ProductListComponent},

    // {path:"",component:HomepageComponent},
        { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
        { path: 'auth/login', component: LoginPageComponent },
        { path: 'auth/register', component: RegisterPageComponent },
        { path: 'homepage', component: HomepageComponent, canActivate: [LoggedGuardService] },
];
