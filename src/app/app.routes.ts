import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoggedGuardService } from './services/guards/logged-guard.service';
import { HomepageComponent } from './homepage/homepage.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// export const routes: Routes = [
    // {path:"",component:HomepageComponent},
        // { path: '', redirectTo: 'auth/login', pathMatch: 'full', },
        // { path: 'auth/login', component: LoginPageComponent },
        // { path: 'auth/register', component: RegisterPageComponent },
        // { path: 'homepage', component: HomepageComponent, canActivate: [LoggedGuardService] },

        // { path: 'dashboard', component: SidebarComponent, canActivate: [LoggedGuardService] },

        
// ];
export const routes: Routes = [
    { path: 'auth/login', component: LoginPageComponent },
  { path: 'auth/register', component: RegisterPageComponent },

  // Rotte con barra laterale
  {
    path: '',
    component: AppComponent,  // AppComponent include Sidebar
    children: [
      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      {
        path: '',
        component: SidebarComponent,
        canActivate: [LoggedGuardService],
        children: [
          { path: 'homepage', component: HomepageComponent },
          // Altre rotte con barra laterale
        ]
      }
    ]
  },

  // Redirige qualsiasi altra rotta a login
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
