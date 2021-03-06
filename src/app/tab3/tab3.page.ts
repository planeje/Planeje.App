import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BankAccountService } from './bank-account.service';
import { BankAccountSettingsComponent } from './bank-account-settings/bank-account-settings.component';
import { finalize } from 'rxjs/operators';
import { BankAccount } from '../usual/models/bank-account.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public loading = true;
  public isOpen = true;
  public bankAccounts: BankAccount[];

  constructor(
    private modalCtlr: ModalController,
    private _bankAccountService: BankAccountService,
  ) {}

  ngOnInit() {
    this._getBanckAccounts();
  }

  private _getBanckAccounts(): void {
    this._bankAccountService.getBankAccounts()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(response => {
        this.bankAccounts = response;
      });
  }

  public async showModalBankAccount(bankAccount?: BankAccount): Promise<void> {
    const accountSettingsModal =  await this.modalCtlr.create({
      component: BankAccountSettingsComponent,
      componentProps: { data: bankAccount }
    });
    accountSettingsModal.present();
    const dataEmitted = (await accountSettingsModal.onDidDismiss()).data;
    if (!!dataEmitted) {
      this.loading = true
      this._getBanckAccounts();
    }

  }

  public deleteBankAccount(id: number): void {
    this._bankAccountService.deleteBankAccount(id).subscribe(() => {
      const index = this.bankAccounts.findIndex(el => el.id === id);
      this.bankAccounts.splice(index, 1);
    }, err => {
      console.log(err);
    });
  }

  doRefresh(event) {
    this.loading = true

    setTimeout(() => {
      this.loading = false
      event.target.complete();
    }, 2000);
  }

  hardRefresh() {
    location.reload();
  }
}

