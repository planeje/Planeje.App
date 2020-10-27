import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SpendingGoal } from 'src/app/usual/models/spending-goal.model';
import { StorageService } from 'src/app/usual/storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpendingGoalService {
  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) {}

  public getGoals(categoryId: number): Observable<SpendingGoal[]> {
    const userId = this._storageService.getUserId();
    const url = `${environment.API_URL}/user/${userId}/category/${categoryId}/goals`;
    return this._http.get<SpendingGoal[]>(url).pipe(
        take(1)
      );
  }

  public createGoal(goal: SpendingGoal, categoryId: number): Observable<SpendingGoal> {
    const userId = this._storageService.getUserId();
    const url = `${environment.API_URL}/user/${userId}/category/${categoryId}/goals`;
    return this._http.post<SpendingGoal>(url, goal).pipe(take(1));
  }

  public editGoal(goal: SpendingGoal, categoryId: number): Observable<SpendingGoal> {
    const url = `${environment.API_URL}/category/${categoryId}/goals/${goal.id}`
    return this._http.put<SpendingGoal>(url, goal).pipe(take(1));
  }
}
