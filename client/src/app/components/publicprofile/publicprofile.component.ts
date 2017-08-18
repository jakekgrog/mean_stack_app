import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-publicprofile',
  templateUrl: './publicprofile.component.html',
  styleUrls: ['./publicprofile.component.css']
})
export class PublicprofileComponent implements OnInit {

  username;
  email;
  message;
  messageClass;
  loggedIn;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  )
  {

    this.route.params.subscribe(params => {
      this.username = params.username;
    })

  } 

  ngOnInit() {
    console.log(this.username);
    this.authService.getUser(this.username).subscribe(data => {
      this.username = data.user.username;
      this.email = data.user.email;
    });
    if (!this.authService.loggedIn()) {
      this.messageClass = "alert alert-danger";
      this.message = "You must be logged in to view this content!";
    } else {
      this.loggedIn = true;
      
    }
  }

}
