import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransactionType } from '../models/transactionType.enum';
import { TransactionService } from './transaction.service';
import { ExpenseSettingsComponent } from './expense-settings/expense-settings.component';
import { Actions } from '../models/actions.enum';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public transactions: any[];

  constructor(
    private modalCtlr: ModalController,
    private _transactionService: TransactionService
  ) {}

  ngOnInit() {
    this._transactionService.getTransactions().subscribe(response => {
      this.transactions = response;
    })
  }

  public async showModalExpense(expense: any) {
    const expenseModal = await this.modalCtlr.create({
      component: ExpenseSettingsComponent,
      componentProps: { data:  expense},
    });
    expenseModal.present();

    const dataEmitted = (await expenseModal.onDidDismiss()).data;

    if (dataEmitted.action === Actions.NEW) {
      this.transactions = [dataEmitted.expese, ...this.transactions];
    }
  }


  public deleteTransaction(id: number): void {
    this._transactionService.deleteTransaction(id).subscribe(() => {
      const index = this.transactions.findIndex(el => el.transaction_id === id);
      this.transactions.splice(index, 1);
    });
  }
}