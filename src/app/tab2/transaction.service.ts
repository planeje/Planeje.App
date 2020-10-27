import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Transaction } from '../usual/models/transaction.model';
import { StorageService } from '../usual/storage.service';

@Injectable({
    providedIn:'root'
})
export class TransactionService {
    constructor(
        private _http: HttpClient,
        private _storageService: StorageService
        ) {}

    public getTransactions(): Observable<Transaction[]> {
        const userId = this._storageService.getUserId();
    return this._http.get<Transaction[]>(`${environment.API_URL}/user/${userId}/transactions`).pipe(
      map(response => !!!response ? [] : response),
      take(1)
    );
  }


    public createTransaction(transaction: Transaction): Observable<Transaction> {
        return this._http.post<Transaction>(`${environment.API_URL}/transactions`, transaction).pipe(
            take(1)
        );
    }

    public deleteTransaction(id: number): Observable<void> {
        return this._http.delete<void>(`${environment.API_URL}/transactions/${id}`)
      .pipe(
        take(1)
      );
  }
    
    public editTransaction(transaction: Transaction): Observable<Transaction> {
        const id = transaction.id;
        return this._http.put<Transaction>(`${environment.API_URL}/transactions/${id}`, transaction)
          .pipe(
            take(1)
          );
      }
      
}