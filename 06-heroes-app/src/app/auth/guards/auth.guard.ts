import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor( private authService: AuthService,
               private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.checkAuth()
                .pipe(
                  tap( isLoggedIn => {
                    if (!isLoggedIn) {
                      console.log("Rejected by canActivate");
                      this.router.navigate(['./auth/login']);
                    }
                  })
                );

      
      // if (this.authService.auth.id) return true;
      // return false;
    }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.checkAuth()
                .pipe(
                  tap( isLoggedIn => {
                    if (!isLoggedIn) {
                      console.log("Rejected by canLoad");
                      this.router.navigate(['./auth/login']);
                    }
                  })
                );

      // if (this.authService.auth.id) return true;
      // return false;
    }
}
