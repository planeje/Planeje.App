import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from '../usual/storage.service';
import { Category } from '../usual/models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
  constructor(private _http: HttpClient, private _storageService: StorageService) {}

  public getCategories(): Observable<Category[]> {
    const userId = this._storageService.getUserId();
    return this._http.get<Category[]>(`${environment.API_URL}/user/${userId}/categories`).pipe(
      map(response => (!!!response ? [] : response)),
      take(1)
    );
  }

  public createCategory(category: Category): Observable<Category> {
    const userId = this._storageService.getUserId();
    return this._http.post<Category>(`${environment.API_URL}/user/${userId}/categories`, category).pipe(take(1));
  }

  public editCategory(category: Category): Observable<Category> {
    const id = category.id
    return this._http.put<Category>(`${environment.API_URL}/categories/${id}`, category).pipe(take(1));
  }

  public deleteCategory(id: number): Observable<void> {
    return this._http.delete<void>(`${environment.API_URL}/categories/${id}`).pipe(take(1));
  }
}
