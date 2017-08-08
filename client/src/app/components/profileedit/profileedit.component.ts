import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.component.html',
  styleUrls: ['./profileedit.component.css']
})
export class ProfileeditComponent implements OnInit {

  username;
  email;
  phone;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  //get our current profile data pre change
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
      this.email = profile.user.email;
      this.phone = profile.user.phone;
    })
  }

  createForm() {
    this.form = this.formBuilder.group({
    newNumber: ['']
    })
}

  onEditSubmit() {
    this.authService.updateUser().subscribe(data => {
      console.log(data.message)
    })
    console.log(this.form.get('newNumber').value);
  }
}
