import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../../services/listing.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-listing',
  templateUrl: './delete-listing.component.html',
  styleUrls: ['./delete-listing.component.css']
})
export class DeleteListingComponent implements OnInit {

  message;
  messageClass;
  foundListing = false;
  processing = false;
  listing;
  currentUrl;

  constructor(
    private listingService: ListingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.listingService.getSingleListing(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.listing = {
          title: data.listing.title,
          body: data.listing.body,
          createdBy: data.listing.createdBy,
          createdAt: data.listing.createdAt
        }
        this.foundListing = true;
      }
    })
  }

  deleteListing() {
    this.processing = true;
    this.listingService.deleteListing(this.currentUrl.id).subscribe(data => {
      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/listing']);
        }, 2000);
      }
    })
  }

}
