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

  public transactions = 
  [
    {
      "transaction_id": 17,
      "description": "mais uma despesa",
      "recurrent": false,
      "transaction_value": "20.00",
      "category_id": "Lazer",
      "bank_id": 0,
      "transaction_date": "06/06/2020",
      "transaction_due_date": "2020-12-10T03:00:00.000Z",
      "transaction_type": 0
    },
    {
      "transaction_id": 14,
      "description": "gasolina",
      "recurrent": true,
      "transaction_value": "30.00",
      "category_id": "Carro",
      "bank_id": 0,
      "transaction_date": "07/06/2020",
      "transaction_due_date": "2020-06-08T03:00:00.000Z",
      "transaction_type": 0
    },
    {
      "transaction_id": 12,
      "description": "Mercado",
      "recurrent": true,
      "transaction_value": "30.00",
      "category_id": "Casa",
      "bank_id": 0,
      "transaction_date": "08/06/2020",
      "transaction_due_date": "2020-06-08T03:00:00.000Z",
      "transaction_type": 0
    }
  ]

  ;

  constructor(
    private modalCtlr: ModalController,
    private _transactionService: TransactionService
  ) {}

  ngOnInit() {
    // this._transactionService.getTransactions().subscribe(response => {
    //   this.transactions = response;
    // })
  }

  public async showModalExpense(expense: any) {
    const expenseModal = await this.modalCtlr.create({
      component: ExpenseSettingsComponent,
      componentProps: { data:  expense},
    });
    expenseModal.present();

    const dataEmitted = (await expenseModal.onDidDismiss()).data;

    if (dataEmitted.action === Actions.NEW) {
      this.transactions = [dataEmitted.expense, ...this.transactions];
    }
  }


  public deleteTransaction(id: number): void {
    this._transactionService.deleteTransaction(id).subscribe(() => {
      const index = this.transactions.findIndex(el => el.transaction_id === id);
      this.transactions.splice(index, 1);
    });
  }
}