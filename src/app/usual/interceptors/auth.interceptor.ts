import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        if (req.url.indexOf(environment.API_URL) === -1) {
            return next.handle(req);
        }

        if (req.url.indexOf(environment.API_URL) >= 0 && !req.url.includes('auth')) {
            const apiToken = localStorage.getItem('apiToken')
            if (apiToken) {
                req = this._addToken(req, apiToken);
              }
        }
    }

    private _addToken(request: HttpRequest<any>, token: string): any {
        return request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
        });
    }
}