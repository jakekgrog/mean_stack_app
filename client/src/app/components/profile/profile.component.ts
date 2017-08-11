import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username;
  email;
  phone;
  website;
  bio;


  constructor(
    private authService: AuthService,
  ) { }

  //Get user profile data
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
      this.email = profile.user.email;
      this.phone = profile.user.phone;
      this.website = profile.user.website;
      this.bio = profile.user.bio;
    })
  }

}
