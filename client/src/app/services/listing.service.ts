import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ListingService {

  options;
  baseUrl = this.authService.baseUrl;

  constructor(
    private authService: AuthService,
    private http: Http,
  ) { }

  createAuthenticationHeaders() {
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      }),
    });
  }

  newListing(listing) {
    this.createAuthenticationHeaders();
    return this.http.post(this.baseUrl + '/listings/newListing', listing, this.options).map(res => res.json());
  }

  getAllListings() {
    this.createAuthenticationHeaders();
    return this.http.get(this.baseUrl + '/listings/allListings', this.options).map(res => res.json());
  }

  getSingleListing(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.baseUrl + '/listings/singleListing/' + id, this.options).map(res => res.json());
  }

  editListing(listing) {
    this.createAuthenticationHeaders();
    console.log(this.authService.authToken);
    console.log(this.options);
    return this.http.put(this.baseUrl + '/listings/updateListing/', listing, this.options).map(res => res.json());
  }

  deleteListing(id){
    this.createAuthenticationHeaders();
    return this.http.delete(this.baseUrl + '/listings/deleteListing/' + id, this.options).map(res => res.json());
  }

  getViewListing(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.baseUrl + '/listings/viewListing/' + id, this.options).map(res => res.json());
    
  }

  postReview(id, review) {
    const reviewData = {
      id: id,
      review: review
    }
    return this.http.post(this.baseUrl + '/listings/review', reviewData, this.options).map(res => res.json());
  }

}
