import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BankAccountService {
    constructor(private _http: HttpClient) {}

    public getBankAccounts(): Observable<any> {
        return this._http.get<any>(`${environment.API_URL}/bankAccounts`).pipe(
            map(response => !!!response ? [] : response),
            take(1)
        );
    }

    public createBankAccount(bankAccount: any): Observable<any> {
        return this._http.post<any>(`${environment.API_URL}/bankAccounts`, bankAccount)
            .pipe(
                take(1)
            );
    }

    public editBankAccount(bankAccount: any): Observable<any> {
        const id = bankAccount.accountId;
        return this._http.put(`${environment.API_URL}/bankAccounts/${id}`, bankAccount)
            .pipe(
                take(1)
            );
    }

    public deleteBankAccount(id: number): Observable<any> {
        return this._http.delete(`${environment.API_URL}/bankAccounts/${id}`)
            .pipe(
                take(1)
            );
    }
}