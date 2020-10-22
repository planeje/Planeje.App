import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private _loginService: LoginService,
        private _router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        if (req.url.indexOf(environment.API_URL) === -1) {
            return next.handle(req);
        }

        if(req.url.includes('forgotPassword'))
            return next.handle(req);

        if(req.url.includes('resetPassword'))
            return next.handle(req);

        if (req.url.indexOf(environment.API_URL) >= 0 && !req.url.includes('authenticate')) {
            const apiToken = this._loginService.getApiToken();
            if (apiToken) {
                req = this._addToken(req, apiToken);
              }
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    this._router.navigate(['tabs/tab2']);
                    return this._handle401Error(req, next);
                } else {
                return throwError(error);
                }
            })
        );
    }

    private _addToken(request: HttpRequest<any>, token: string): any {
        return request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
        });
    }

    private _handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        this._loginService.logout();
        return next.handle(request);
    }
}