import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../usual/models/user.model';
@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    constructor(private _http: HttpClient) {}

    public createUser(data: User): Observable<any> {
        return this._http.post<any>(`${environment.API_URL}/users`, data)
            .pipe(take(1));
    }
}
