import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoggedGuardService } from './services/guards/logged-guard.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CommunicationListComponent } from './communication-list/communication-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { StoredTaskListComponent } from './stored-task-list/stored-task-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ExpiredPageComponent } from './expired-page/expired-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { DeleteSupCatComponent } from './delete-sup-cat/delete-sup-cat.component';



/**
 * *Codice di esempio per come si fanno le routes base normalmente senza childs
 * @Santo
 */
// export const routes: Routes = [
    // {path:"",component:HomepageComponent},
        // { path: '', redirectTo: 'auth/login', pathMatch: 'full', },
        // { path: 'auth/login', component: LoginPageComponent },
        // { path: 'auth/register', component: RegisterPageComponent },
        // { path: 'homepage', component: HomepageComponent, canActivate: [LoggedGuardService] },

        // { path: 'dashboard', component: SidebarComponent, canActivate: [LoggedGuardService] },
// ];

// 
export const routes: Routes = [
  { path: 'auth/login', component: LoginPageComponent },
  { path: 'auth/register', component: RegisterPageComponent },
  { path: 'tokenExpired', component: ErrorPageComponent },
  /**
   * *Codice extra non necessario, lasciato in caso di necessità e per reference
   * @Santo
   */
  // Rotte con barra laterale
  // {
  //   path: '',
  //   component: AppComponent,  // AppComponent include Sidebar
  //   children: [
      // { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      {
        path: '',
        component: DashboardComponent,
        canActivate: [LoggedGuardService],
        children: [
         /**
          *  *Ho aggiunto il loggedGuard anche sotto sennò l'app startava nella homepage, 
          *  *per sicurezza meglio metterlo ovunque lo si voglia.
          *  @Santo
          */
          { path: 'homepage', component: HomepageComponent, canActivate: [LoggedGuardService] }, 
          { path: '', redirectTo: '/homepage', pathMatch: 'full' },
          { path: 'products', component: ProductListComponent, canActivate: [LoggedGuardService] },
          { path: 'communications', component: CommunicationListComponent, canActivate: [LoggedGuardService] },
          { path: 'orders', component: OrderListComponent, canActivate: [LoggedGuardService] },
          { path: 'storedtasks', component: StoredTaskListComponent, canActivate: [LoggedGuardService] },
          { path: 'tasks', component: TaskListComponent, canActivate: [LoggedGuardService] },
          { path: 'userPage', component: UserPageComponent, canActivate: [LoggedGuardService] },
          { path: 'forbidden', component: ForbiddenComponent, canActivate: [LoggedGuardService] },
          { path: 'pageNotFound', component: PageNotFoundComponent },
          {path: 'fathersPage', component:DeleteSupCatComponent, canActivate: [LoggedGuardService]},

          { path: '', redirectTo: '/homepage', pathMatch: 'full' },


          // Altre rotte con barra laterale
        ]
      },
  //   ]
  // },

  /**
   * *Redirige qualsiasi altra rotta a page not found
   * @Santo
   */
  { path: '**', redirectTo: 'pageNotFound', }
];

/**
 * *codice extra che mi aveva buttato fuori chatgpt ma apparentemente inutile, l'ho lasciato per indagare
 * @Santo
 */
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
