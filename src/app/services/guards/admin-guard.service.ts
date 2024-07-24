import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, MaybeAsync, GuardResult } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private authService:AuthService, private router:Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> 
  {
    if(this.authService.userHasRole("ADMIN"))
      return true;

    this.router.navigate(["unauthorized"]);
    return false;
  }
}
