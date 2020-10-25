import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TransactionService } from './transaction.service';
import { ExpenseSettingsComponent } from './expense-settings/expense-settings.component';
import { RevenueSettingsComponent } from './revenue-settings/revenue-settings.component';
import { TransactionType } from '../usual/models/transactionType.enum';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public loading = false;
  public transactions =
  [
    {
      "transaction_id": 17,
      "description": 'Churrasco na casa do João',
      "recurrent": false,
      "transaction_value": '10.00',
      "category_id": 'Lazer',
      "bank_id": 0,
      "transaction_date": '07/06/2020',
      "transaction_due_date": '2020-12-10T03:00:00.000Z',
      "transaction_type": 0,
      "color": 'blue',
      "transaction_color": 'red'
    },
    {
      "transaction_id": 17,
      "description": 'Itens de limpeza',
      "recurrent": false,
      "transaction_value": '120.00',
      "category_id": 'Casa',
      "bank_id": 0,
      "transaction_date": '06/06/2020',
      "transaction_due_date": '2020-12-10T03:00:00.000Z',
      "transaction_type": 0,
      "color": 'red',
      "transaction_color": 'red'
    },
    {
      "transaction_id": 17,
      "description": 'IPTU',
      "recurrent": false,
      "transaction_value": '35.00',
      "category_id": 'Despesas fixas',
      "bank_id": 0,
      "transaction_date": '05/06/2020',
      "transaction_due_date": '2020-12-10T03:00:00.000Z',
      "transaction_type": 0,
      "color": 'green',
      "transaction_color": 'red'
    },    
    {
      "transaction_id": 17,
      "description": 'Poker',
      "recurrent": false,
      "transaction_value": '1250.00',
      "category_id": 'Lazer',
      "bank_id": 0,
      "transaction_date": '08/10/2020',
      "transaction_due_date": '2020-12-10T03:00:00.000Z',
      "transaction_type": 0,
      "color": 'blue',
      "transaction_color": 'green'
    },
  ];
  

  constructor(
    private modalCtlr: ModalController,
    private _transactionService: TransactionService,
  ) {}

  ngOnInit() {
    // this._getTransactions();
  }

  // private _getTransactions() {
  //   this._transactionService.getTransactions()
  //     .pipe(finalize(() => (this.loading = false)))
  //     .subscribe(response => {
  //       this.transactions = response;
  //       this.loading = false;
  //     });
  // }

  public async showModalExpense(expense?: any) {
    const expenseModal = await this.modalCtlr.create({
      component: ExpenseSettingsComponent,
      componentProps: { data: expense },
    });
    expenseModal.present();
    const dataEmitted = (await expenseModal.onDidDismiss()).data;
    if (!!dataEmitted) {
      this.loading = true;
      // this._getTransactions();
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
      // this._getTransactions();
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
