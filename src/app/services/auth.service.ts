import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData } from '../model/LoginData';
import { RegistrationData } from '../model/RegistrationData';
import { Router } from '@angular/router';


/**
 * Ogni metodo dei servizi che usano un vero db, usando oggetti HttpClient ritornano Observable
 * e di conseguenza se richiamati andratto sottoscritti. (subscribe)
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router:Router) {
    
    this.token = localStorage.getItem('token');
    console.log('Token:' + this.token);
    console.log(this.tokenExpired(this.token));
  }
  
  token:string | null;

  private tokenExpired(token: string | null): boolean {
    if (!token) {
      return true; // Token non presente è considerato scaduto o non valido
    }
  
    try {
      // Decodifica la parte del payload del token
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Ottieni la data di scadenza dal payload
      const expiry = payload.exp;
      console.log(expiry);
  
      // Se non c'è il campo exp, consideriamo il token come non valido
      if (!expiry) {
        return true;
      }
  
      // Confronta la data di scadenza con il tempo corrente
      return (Math.floor(new Date().getTime() / 1000)) >= expiry;
    } catch (e) {
      // Se c'è un errore nella decodifica, considera il token come scaduto
      return true;
    }
  }

  isTokenExpired():boolean
  {
    return this.tokenExpired(this.token);
  }
  
  login(loginData:LoginData)
  {
    this.logout();
    // let body = {'username':username,'password':password};
    return this.http.post<any>("/api/auth/login",loginData);
  }

  logout()
  {
    this.clearLocalStorage();
    this.router.navigate(["auth/login"]);
  }

  register(registrationData:RegistrationData)
  {
    this.clearLocalStorage();
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

  private clearLocalStorage()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("profileid");
    localStorage.removeItem("profilename");
    localStorage.removeItem("profilesurname");
    localStorage.removeItem("username");
    // localStorage.removeItem("user");
  }
}