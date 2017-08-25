import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AdminService {

  isAdmin = false;

  constructor(
    private authService: AuthService,
  ) { }

}
