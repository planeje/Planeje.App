import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BankAccountService } from './bank-account.service';
import { BankAccountSettingsComponent } from './bank-account-settings/bank-account-settings.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public loading = true;
  public bankAccounts: any[];

  constructor(
    private modalCtlr: ModalController,
    private _bankAccountService: BankAccountService
  ) {}

  ngOnInit() {
    this._bankAccountService.getBankAccounts().subscribe(response => {
      this.bankAccounts = response;
      this.loading = false;
    })
  }

  public async showModalBankAccount(bankAccount?: any) {
    const modalTab =  await this.modalCtlr.create({
      component: BankAccountSettingsComponent,
      componentProps: { data: bankAccount }
    });
    modalTab.present();
  }

  public deleteBankAccount(id: number): void {
    this._bankAccountService.deleteBankAccount(id).subscribe();
  }
}