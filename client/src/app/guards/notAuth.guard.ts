import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class NotAuthGuard implements CanActivate {
    constructor (
        private authService: AuthService,
        private router: Router,
    ) { }

    //check if user is logged in. If so, redirect
    canActivate() {
        if (this.authService.loggedIn()) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}