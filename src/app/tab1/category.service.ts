import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(private _http: HttpClient) {}

    public getCategories(): Observable<any> {
        return this._http.get('http://localhost:3000/api/categories').pipe(
            map(response => (!!!response ? [] : response)),
            take(1)
        );
    }

    public createCategory(category: any): Observable<any> {
        return this._http.post('http://localhost:3000/api/categories', category).pipe(take(1));
    }

    public editCategory(category: any): Observable<any> {
        const id = category.categoryId
        return this._http.put(`http://localhost:3000/api/categories/${category.categoryId}`, category).pipe(take(1));
    }

    public deleteCategory(id: number): Observable<any> {
        return this._http.delete(`http://localhost:3000/api/categories/${id}`).pipe(take(1));
    }
}