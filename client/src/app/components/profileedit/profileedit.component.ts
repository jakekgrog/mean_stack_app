import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.component.html',
  styleUrls: ['./profileedit.component.css']
})
export class ProfileeditComponent implements OnInit {

  username;
  email;
  phone;
  bio;
  website;
  newPhNumber;
  newBio;
  newWebsite;
  messageClass: string;
  message: string;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.createForm();
  }

  //get our current profile data pre change
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
      this.email = profile.user.email;
      this.phone = profile.user.phone;
      this.website = profile.user.website;
      this.bio = profile.user.bio;
      
    })
  }

  //Create our form with it's validators.
  createForm() {
    this.form = this.formBuilder.group({
    newNumber: ['', Validators.compose([
      Validators.required,
      this.validatePhone
    ])],

    newBio: ['', Validators.compose([
      Validators.required,
      this.validateBio
    ])],
    newWebsite: ['',Validators.compose([
      Validators.required,
      this.validateWebsite
    ])]

    })
}

//Valid phone is 0-10 Digits only.
  validatePhone(controls) {
    const regex = /^\d{0,10}$/;
    if(regex.test(controls.value)) {
      return null;
    }
    else {
      return {'validatePhone': true};
    }

  }

//Valid bio is anything under 300 characters.
  validateBio(controls) {
    if(controls.value.length < 300) {
      return null;
    }

    else {
      return {'validateBio': true}
    }
  }
//Valid Website is anything < 30 characters.
  validateWebsite(controls) {
    if(controls.value.length < 30) {
      return null;
    }
    else {
      return {'validateWebsite': true};
    }
  }

  onEditSubmit() {

    //Takes values from form & makes a new user object.
    this.newPhNumber = this.form.get('newNumber').value;
    this.newBio = this.form.get('newBio').value;
    this.newWebsite = this.form.get('newWebsite').value;
        const user = {
      username: this.username,
      email: this.email,
      phone: this.newPhNumber,
      bio: this.newBio,
      website: this.newWebsite
      
    }
//Pass user model to updateUser() and listen for return data.
    this.authService.updateUser(user).subscribe(data => {
      console.log(data)
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/profile']);
        },1000);
      }
    });
  }

}
