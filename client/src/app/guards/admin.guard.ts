import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminGuard implements CanActivate{

    redirectUrl;
    isValidAdmin = false;

    constructor (
        private authService: AuthService,
        private router: Router,
        private adminService: AdminService,
    ) { this.authService.isAdmin().subscribe(data => {
        this.isValidAdmin = data.success;
    }); }

    //Check if user is logged if. If not, redirect
    canActivate(
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ) {
        return this.authService.isAdmin().map(data => {
            if (data.success) {
                return true;
            }
            return false;
        })
    }
}