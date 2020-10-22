import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  constructor(private _http: HttpClient) {}

  public getUserInfo(): Observable<User> {
    const userId = JSON.parse(localStorage.getItem('userId'));
    return this._http.get<User>(`${environment.API_URL}/users/${userId}`)
      .pipe(take(1));
  }

  public updateUserInfo(userId: number, data: User): Observable<User> {
    return this._http.put<User>(`${environment.API_URL}/users/${userId}`, data)
    .pipe(take(1));
  }

  public changePassword(userId: number, data: { password: string }): Observable<void> {
    return this._http.put<void>(`${environment.API_URL}/users/${userId}/changePassword`, data)
      .pipe(take(1));
  }
}
