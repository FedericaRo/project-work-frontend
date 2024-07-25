import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { LoginData } from '../model/LoginData';
import { RegistrationData } from '../model/RegistrationData';


/**
 * Ogni metodo dei servizi che usano un vero db, usando oggetti HttpClient ritornano Observable
 * e di conseguenza se richiamati andratto sottoscritti. (subscribe)
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  

  login(loginData:LoginData)
  {
    this.logout();
    // let body = {'username':username,'password':password};
    return this.http.post<any>("/api/auth/login",loginData);
  }

  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  register(registrationData:RegistrationData)
  {
    this.logout();
    console.log("REGISTRATION DATA");
    console.log(registrationData);
    return this.http.post('api/auth/register', registrationData, { responseType: 'text' });
  }

  isLogged():boolean
  {
    if(localStorage.getItem("token"))
      return true;

    return false;
  }

  getUserRole()
  {
    return localStorage.getItem("role");
  }

  userHasRole(role:string)
  {
    return this.isLogged() && this.getUserRole()==role;
  }
}