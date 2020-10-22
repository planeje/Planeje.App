import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordService {
    constructor(private _http: HttpClient) {}

    public sendEmailToken(email: string): Observable<void> {
        return this._http.post<void>(`${environment.API_URL}/users/forgotPassword`, email)
            .pipe(
                take(1)
            );
    }

    public resetPassword(data: { email: string, token: string, password: string }): Observable<void> {
        return this._http.post<void>(`${environment.API_URL}/users/resetPassword`, data)
            .pipe(
                take(1)
            );
    }
}