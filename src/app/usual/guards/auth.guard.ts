import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _loginService: LoginService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const token = this._loginService.getApiToken();
      if(next.routeConfig.path === 'token')
        return true;

      if(next.routeConfig.path === 'forgot-password')
        return true;


      if(!token) {
        this._router.navigate(['login']);
        return false;
      } else {
        return true;
      }
  }
}
