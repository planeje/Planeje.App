import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class TransactionService {

    constructor(private _http: HttpClient) {}

    public getTransactions(): Observable<any> {
        return this._http.get<any>('http://localhost:3000/api/transactions').pipe(
            map(response => (!!response ? response : [])),
            take(1)
        );
    }

    public createExpense(expense: any): Observable<any> {
        return this._http.post<any>('http://localhost:3000/api/transactions', expense).pipe(
            take(1)
        );
    }

    public deleteTransaction(id: number): Observable<any> {
        return this._http.delete(`http://localhost:3000/api/transactions/${id}`).pipe(take(1));
    }

    public editTransaction(transaction: any): Observable<any> {
        const id = transaction.transactionId;
        return this._http.put(`http://localhost:3000/api/transactions/${id}`,
        transaction).pipe(take(1));
    }
}