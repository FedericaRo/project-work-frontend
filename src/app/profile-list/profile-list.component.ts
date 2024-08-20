import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../services/profiles.service';
import { Profile } from '../model/Profile';

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.css'
})
export class ProfileListComponent implements OnInit
{
  constructor(private profileService:ProfilesService){}

  profiles:Profile[] = []

  ngOnInit(): void 
  {
    this.profileService.getAll().subscribe(data=>{this.profiles=data})
  }


}
