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

  getAll():Observable<Profile[]>
  {
    return this.http.get<Profile[]>(`api/profiles/${localStorage.getItem('username')}`)
  }

  getPropic(profileId:number | null):Observable<Blob>
  {
    return this.http.get(`api/profiles/images/${profileId}`, { responseType: 'blob' });
  }

  getUrlFromBlob(blob : Blob) 
  {
    return URL.createObjectURL(blob);
  }

  delete(id: number):Observable<Profile>
  {
    return this.http.delete<Profile>(`/api/profiles/${id}`);
  }

  // saveProfilePicture(file:any):Observable<Profile>
  // {
  //   return this.http.post('api/imgupload', file)
  // }
}
