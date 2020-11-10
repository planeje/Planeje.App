import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from '../usual/storage.service';
import { Activities } from '../usual/models/activities.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) { }

  public getActivities(): Observable<Activities[]> {
    const userId = this._storageService.getUserId();
    console.log(userId)
  return this._http.get<Activities[]>(`${environment.API_URL}/user/${userId}/logs`).pipe(
  map(response => !!!response ? [] : response),
  take(1),
  );
}

}
