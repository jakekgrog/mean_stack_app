import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  message;
  messageClass;
  newListing = false;
  loadingListings = false;
  form;
  processing: boolean = false;
  username;
  loggedIn;
  allListings;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private listingService: ListingService,
  ) {
    this.createNewListingFrom();
    this.loggedIn = this.authService.loggedIn;
    
   }

  createNewListingFrom() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(5000),
        Validators.minLength(1),
      ])]
    })
  }

  alphaNumericValidation(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'alphaNumericValidation': true };
    }

  }

  enableNewListingForm() {
    this.form.get('title').enable(),
    this.form.get('body').enable()
  }

  disableNewListingForm() {
    this.form.get('title').disable(),
    this.form.get('body').disable()
  }

  newListingForm() {
    this.newListing = true;
  }

  reloadListings() {
    this.loadingListings = true;
    
    setTimeout(() => {
      this.loadingListings = false;
      this.getListings();
    }, 2000);
  }

  goBack(){
    window.location.reload();
  }

  draftComment() {

  }

  getListings() {
    this.listingService.getAllListings().subscribe(listings => {
      this.allListings = listings.listings;
    });
  }

  onListingSubmit() {
    this.processing = true;
    this.disableNewListingForm();

    const listing = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      createdBy: this.username
    }

    this.listingService.newListing(listing).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableNewListingForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getListings();
        setTimeout(() => {
          this.newListing = false;
          this.processing = false;
          this.message = false;
          this.form.reset();
          this.enableNewListingForm();
        }, 2000);
      }
    })
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    });

    this.getListings();
  }

}
