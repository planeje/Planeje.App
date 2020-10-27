import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BankAccount } from '../usual/models/bank-account.model';
import { StorageService } from '../usual/storage.service';

@Injectable({
    providedIn: 'root'
})
export class BankAccountService {
  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) {}

  public getBankAccounts(): Observable<BankAccount[]> {
    const userId = this._storageService.getUserId();
    return this._http.get<BankAccount[]>(`${environment.API_URL}/user/${userId}/bankAccounts`).pipe(
      map(response => !!!response ? [] : response),
      take(1)
    );
  }

  public createBankAccount(bankAccount: BankAccount): Observable<BankAccount> {
    const userId = this._storageService.getUserId();
    return this._http.post<BankAccount>(`${environment.API_URL}/user/${userId}/bankAccounts`, bankAccount)
      .pipe(
        take(1)
      );
  }

  public editBankAccount(bankAccount: BankAccount): Observable<BankAccount> {
    const id = bankAccount.id;
    return this._http.put<BankAccount>(`${environment.API_URL}/bankAccounts/${id}`, bankAccount)
      .pipe(
        take(1)
      );
  }

  public deleteBankAccount(id: number): Observable<void> {
    return this._http.delete<void>(`${environment.API_URL}/bankAccounts/${id}`)
      .pipe(
        take(1)
      );
  }
}
