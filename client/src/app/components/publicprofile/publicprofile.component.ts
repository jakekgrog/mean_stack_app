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
  }

}
