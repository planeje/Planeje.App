import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private _http: HttpClient) {}

    public authenticate(email: string, password: string): Observable<string> {
        return this._http.post<any>(`${environment.API_URL}/users/authenticate`,
            { email, password }
        ).pipe(
            take(1),
            map(response => {
                localStorage.setItem('apiToken', JSON.stringify(response.token));
                return response.token;
            })
        );
    }

    public getApiToken(): string {
        const token = localStorage.getItem('apiToken');
        return token ? token : null;
    }
}