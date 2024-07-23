import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/user';


/**
 * Ogni metodo dei servizi che usano un vero db, usando oggetti HttpClient ritornano Observable
 * e di conseguenza se richiamati andratto sottoscritti. (subscribe)
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(username:string,password:string)
  {
    this.logout();
    let body = {'username':username,'password':password};
    return this.http.post<any>("/api/auth/login",body);
  }

  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  register(user:User):Observable<any>
  {
    this.logout();
    const options = { 
      params: new HttpParams().set('role', user.role),
      responseType: 'text' as 'json'
    };

    const body = { 'username': user.username, 'password': user.password,};
    
    return this.http.post('/api/auth/register', body, options);
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