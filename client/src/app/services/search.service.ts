import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class SearchService {

  baseUrl = this.authService.baseUrl;

  constructor(
    private authService: AuthService,
  ) { 

  }


}
