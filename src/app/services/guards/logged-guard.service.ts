import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, MaybeAsync, GuardResult } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuardService {

  constructor(private authService:AuthService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> 
  {
    if(this.authService.isLogged())
      return true;

    this.router.navigate(["auth/login"]);
    alert('Non hai i permessi necessari per accedere, devi prima fare il Login.');
    return false;
  }
}
