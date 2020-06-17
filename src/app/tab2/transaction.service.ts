import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn:'root'
})
export class TransactionService {

    constructor(private _http: HttpClient) {}

    public getTransactions(): Observable<any> {
        return this._http.get<any>(`${environment.API_URL}/transactions`).pipe(
            map(response => (!!response ? response : [])),
            take(1)
        );
    }

    public createExpense(expense: any): Observable<any> {
        return this._http.post<any>(`${environment.API_URL}/transactions`, expense).pipe(
            take(1)
        );
    }

    public deleteTransaction(id: number): Observable<any> {
        return this._http.delete(`${environment.API_URL}/transactions/${id}`).pipe(take(1));
    }

    public editTransaction(transaction: any): Observable<any> {
        const id = transaction.transactionId;
        return this._http.put(`${environment.API_URL}/transactions/${id}`,
        transaction).pipe(take(1));
    }
}