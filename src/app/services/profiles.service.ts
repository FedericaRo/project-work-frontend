import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../model/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private http:HttpClient){ }

  
  createNewProfile(profile:Profile):Observable<Profile>
  {
    return this.http.post<Profile>(`api/profiles/newProfile`, profile);
  }

  // saveProfilePicture(file:any):Observable<Profile>
  // {
  //   return this.http.post('api/imgupload', file)
  // }
}
