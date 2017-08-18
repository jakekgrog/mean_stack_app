import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../../../services/listing.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-listing',
  templateUrl: './view-listing.component.html',
  styleUrls: ['./view-listing.component.css']
})
export class ViewListingComponent implements OnInit {

  message;
  messageClass;
  foundListing = false;
  listing;
  currentUrl;
  reviewForm;
  newReview = [];
  enabledReviews= [];
  processing;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private listingService: ListingService,
    private formBuilder: FormBuilder,
  ) { 
    this.createReviewForm();
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.listingService.getViewListing(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.listing = {
          _id: data.listing._id,
          title: data.listing.title,
          body: data.listing.body,
          reviews: data.listing.reviews,
          createdBy: data.listing.createdBy,
          createdAt: data.listing.createdAt
        }
        this.foundListing = true;
      }
    });
  }

  createReviewForm() {
    this.reviewForm = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500)
      ])]
    });
  }

  enableReviewForm() {
    this.reviewForm.get('comment').enable();
  }

  disableReviewForm() {
    this.reviewForm.get('comment').disable();
  }

  draftReview(id) {
    this.newReview = [];
    this.newReview.push(id);
  }

  cancelSubmission(id) {
    const index = this.newReview.indexOf(id);
    this.newReview.splice(index, 1);
    this.reviewForm.reset();
    this.enableReviewForm();
    this.processing = false;
  }
  
  postReview(id) {
    this.disableReviewForm();
    this.processing = true;
    const review = this.reviewForm.get('comment').value;
    console.log(review);
    this.listingService.postReview(id, review).subscribe(data => {
      this.listingService.getViewListing(this.currentUrl.id);
      const index = this.newReview.indexOf(id);
      this.newReview.splice(index, 1);
      this.enableReviewForm();
      this.reviewForm.reset();
      this.processing = false;
      if (this.enabledReviews.indexOf(id) < 0) this.expand(id);
    })
  }

  expand(id) {
    this.enabledReviews.push(id);
  }

  collapse(id) {
    const index = this.enabledReviews.indexOf(id);
    this.enabledReviews.splice(index, 1);
  }

}
