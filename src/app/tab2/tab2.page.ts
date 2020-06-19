import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransactionType } from '../models/transactionType.enum';
import { TransactionService } from './transaction.service';
import { ExpenseSettingsComponent } from './expense-settings/expense-settings.component';
import { Actions } from '../models/actions.enum';
import { RevenueSettingsComponent } from './revenue-settings/revenue-settings.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public loading = true;
  public transactions: any[];

  constructor(
    private modalCtlr: ModalController,
    private _transactionService: TransactionService
  ) {}

  ngOnInit() {
    this._getTransactions();
  }

  private _getTransactions() {
    this._transactionService.getTransactions()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(response => {
        this.transactions = response;
        this.loading = false;
      });
  }

  public async showModalExpense(expense?: any) {
    const expenseModal = await this.modalCtlr.create({
      component: ExpenseSettingsComponent,
      componentProps: { data: expense },
    });
    expenseModal.present();
    const dataEmitted = (await expenseModal.onDidDismiss()).data;
    if (!!dataEmitted) {
      this.loading = true;
      this._getTransactions();
    }
  }

  public async showModalRevenue(revenue?: any) {
    const revenueModal = await this.modalCtlr.create({
      component: RevenueSettingsComponent,
      componentProps: { data: revenue }
    });
    revenueModal.present();
    const dataEmitted = (await revenueModal.onDidDismiss()).data;
    if (!!dataEmitted) {
      this.loading = true;
      this._getTransactions();
    }
  }

  public editTransaction(transaction: any) {
    transaction.transaction_type === TransactionType.EXPENSE
      ? this.showModalExpense(transaction)
      : this.showModalRevenue(transaction);
  }


  public deleteTransaction(id: number): void {
    this._transactionService.deleteTransaction(id).subscribe(() => {
      const index = this.transactions.findIndex(el => el.transaction_id === id);
      this.transactions.splice(index, 1);
    });
  }
}