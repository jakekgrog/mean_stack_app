import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../../../services/listing.service';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {

  message;
  messageClass;
  listing;
  processing = false;
  currentUrl;
  loading = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private listingService: ListingService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.listingService.getSingleListing(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = 'Listing not found';
      } else {
        this.listing = data.listing;
        this.loading = false;
      }
    });
  }

  updateListingSubmit() {
    this.processing = true;
    this.listingService.editListing(this.listing).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/listing']);
        }, 2000);
      }
    });
  }

  goBack() {
    this.location.back();
  }


}
