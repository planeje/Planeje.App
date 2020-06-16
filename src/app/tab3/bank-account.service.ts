import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BankAccountService {
    constructor(private _http: HttpClient) {}

    public getBankAccounts(): Observable<any> {
        return this._http.get<any>('http://localhost:3000/api/bankAccounts').pipe(
            map(response => !!!response ? [] : response),
            take(1)
        );
    }

    public createBankAccount(bankAccount: any): Observable<any> {
        return this._http.post<any>('http://localhost:3000/api/bankAccounts', bankAccount)
            .pipe(
                take(1)
            );
    }

    public editBankAccount(bankAccount: any): Observable<any> {
        const id = bankAccount.accountId;
        return this._http.put(`http://localhost:3000/api/bankAccounts/${id}`, bankAccount)
            .pipe(
                take(1)
            );
    }

    public deleteBankAccount(id: number): Observable<any> {
        return this._http.delete(`http://localhost:3000/api/bankAccounts/${id}`)
            .pipe(
                take(1)
            );
    }
}